# =============================================================================
# HireDesk UI - Docker Test Script (PowerShell)
# =============================================================================
# This script tests the Docker setup and verifies everything works correctly
# =============================================================================

param(
    [Parameter()]
    [ValidateSet("quick", "full", "production", "development")]
    [string]$TestType = "quick"
)

$ErrorActionPreference = "Continue"

# Colors
$ColorReset = "`e[0m"
$ColorRed = "`e[91m"
$ColorGreen = "`e[92m"
$ColorYellow = "`e[93m"
$ColorBlue = "`e[94m"
$ColorCyan = "`e[96m"

function Write-ColorOutput($ForegroundColor, $Message) {
    $color = switch ($ForegroundColor) {
        "Red" { $ColorRed }
        "Green" { $ColorGreen }
        "Yellow" { $ColorYellow }
        "Blue" { $ColorBlue }
        "Cyan" { $ColorCyan }
        default { $ColorReset }
    }
    Write-Host "${color}${Message}${ColorReset}"
}

function Write-TestHeader($Title) {
    Write-Host ""
    Write-ColorOutput "Cyan" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    Write-ColorOutput "Cyan" "  $Title"
    Write-ColorOutput "Cyan" "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

function Test-Success($Message) {
    Write-ColorOutput "Green" "✓ $Message"
    return $true
}

function Test-Failure($Message) {
    Write-ColorOutput "Red" "✗ $Message"
    return $false
}

function Test-Warning($Message) {
    Write-ColorOutput "Yellow" "⚠ $Message"
}

# =============================================================================
# Test Functions
# =============================================================================

function Test-Prerequisites {
    Write-TestHeader "Prerequisites Check"
    $allGood = $true
    
    # Check Docker
    try {
        $dockerVersion = docker --version
        Test-Success "Docker installed: $dockerVersion"
    } catch {
        Test-Failure "Docker is not installed or not in PATH"
        $allGood = $false
    }
    
    # Check Docker Compose
    try {
        $composeVersion = docker-compose --version
        Test-Success "Docker Compose installed: $composeVersion"
    } catch {
        Test-Failure "Docker Compose is not installed or not in PATH"
        $allGood = $false
    }
    
    # Check Docker daemon
    try {
        docker ps | Out-Null
        Test-Success "Docker daemon is running"
    } catch {
        Test-Failure "Docker daemon is not running"
        $allGood = $false
    }
    
    # Check required files
    $requiredFiles = @(
        "Dockerfile",
        "Dockerfile.dev",
        "docker-compose.yml",
        ".dockerignore",
        "package.json"
    )
    
    foreach ($file in $requiredFiles) {
        if (Test-Path $file) {
            Test-Success "Found $file"
        } else {
            Test-Failure "Missing $file"
            $allGood = $false
        }
    }
    
    return $allGood
}

function Test-BuildProduction {
    Write-TestHeader "Building Production Image"
    
    try {
        Write-Host "Building production image (this may take a few minutes)..."
        docker-compose build hiredesk 2>&1 | Out-Null
        
        $imageExists = docker images hiredesk:latest -q
        if ($imageExists) {
            Test-Success "Production image built successfully"
            
            # Check image size
            $imageSize = docker images hiredesk:latest --format "{{.Size}}"
            Write-Host "  Image size: $imageSize"
            return $true
        } else {
            Test-Failure "Production image build failed"
            return $false
        }
    } catch {
        Test-Failure "Error building production image: $_"
        return $false
    }
}

function Test-BuildDevelopment {
    Write-TestHeader "Building Development Image"
    
    try {
        Write-Host "Building development image..."
        docker-compose build hiredesk-dev 2>&1 | Out-Null
        
        $imageExists = docker images hiredesk:dev -q
        if ($imageExists) {
            Test-Success "Development image built successfully"
            
            # Check image size
            $imageSize = docker images hiredesk:dev --format "{{.Size}}"
            Write-Host "  Image size: $imageSize"
            return $true
        } else {
            Test-Failure "Development image build failed"
            return $false
        }
    } catch {
        Test-Failure "Error building development image: $_"
        return $false
    }
}

function Test-StartProduction {
    Write-TestHeader "Starting Production Container"
    
    try {
        Write-Host "Starting production container..."
        docker-compose up -d hiredesk 2>&1 | Out-Null
        Start-Sleep -Seconds 10
        
        $containerRunning = docker ps --filter "name=hiredesk-app" --filter "status=running" -q
        if ($containerRunning) {
            Test-Success "Production container is running"
            
            # Check health
            Write-Host "Waiting for health check..."
            Start-Sleep -Seconds 20
            
            $health = docker inspect --format='{{.State.Health.Status}}' hiredesk-app 2>$null
            if ($health -eq "healthy") {
                Test-Success "Container is healthy"
            } else {
                Test-Warning "Container health: $health"
            }
            
            return $true
        } else {
            Test-Failure "Production container is not running"
            return $false
        }
    } catch {
        Test-Failure "Error starting production container: $_"
        return $false
    }
}

function Test-HTTPEndpoint {
    Write-TestHeader "Testing HTTP Endpoints"
    
    try {
        Write-Host "Testing http://localhost:3000..."
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10
        
        if ($response.StatusCode -eq 200) {
            Test-Success "HTTP endpoint is accessible (Status: $($response.StatusCode))"
            return $true
        } else {
            Test-Failure "HTTP endpoint returned status: $($response.StatusCode)"
            return $false
        }
    } catch {
        Test-Failure "Cannot access HTTP endpoint: $_"
        
        # Show container logs
        Write-Host ""
        Write-ColorOutput "Yellow" "Container logs (last 20 lines):"
        docker logs --tail=20 hiredesk-app
        
        return $false
    }
}

function Test-ContainerLogs {
    Write-TestHeader "Checking Container Logs"
    
    try {
        $logs = docker logs --tail=50 hiredesk-app 2>&1
        
        if ($logs -match "error|fatal|exception") {
            Test-Warning "Found errors in container logs"
            Write-Host $logs
            return $false
        } else {
            Test-Success "No critical errors in logs"
            return $true
        }
    } catch {
        Test-Failure "Cannot retrieve container logs: $_"
        return $false
    }
}

function Test-ResourceUsage {
    Write-TestHeader "Checking Resource Usage"
    
    try {
        $stats = docker stats hiredesk-app --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
        Write-Host $stats
        Test-Success "Resource usage retrieved"
        return $true
    } catch {
        Test-Warning "Cannot retrieve resource usage: $_"
        return $false
    }
}

function Test-Cleanup {
    Write-TestHeader "Cleaning Up"
    
    try {
        Write-Host "Stopping containers..."
        docker-compose down 2>&1 | Out-Null
        Test-Success "Containers stopped"
        return $true
    } catch {
        Test-Failure "Error during cleanup: $_"
        return $false
    }
}

# =============================================================================
# Test Suites
# =============================================================================

function Run-QuickTest {
    Write-ColorOutput "Blue" @"
╔══════════════════════════════════════════════════════════════╗
║              HireDesk UI - Quick Docker Test                 ║
╚══════════════════════════════════════════════════════════════╝
"@
    
    $results = @{
        Total = 0
        Passed = 0
        Failed = 0
    }
    
    $tests = @(
        { Test-Prerequisites }
        { Test-BuildProduction }
        { Test-StartProduction }
        { Test-HTTPEndpoint }
        { Test-Cleanup }
    )
    
    foreach ($test in $tests) {
        $results.Total++
        if (& $test) {
            $results.Passed++
        } else {
            $results.Failed++
        }
    }
    
    return $results
}

function Run-FullTest {
    Write-ColorOutput "Blue" @"
╔══════════════════════════════════════════════════════════════╗
║              HireDesk UI - Full Docker Test                  ║
╚══════════════════════════════════════════════════════════════╝
"@
    
    $results = @{
        Total = 0
        Passed = 0
        Failed = 0
    }
    
    $tests = @(
        { Test-Prerequisites }
        { Test-BuildProduction }
        { Test-BuildDevelopment }
        { Test-StartProduction }
        { Test-HTTPEndpoint }
        { Test-ContainerLogs }
        { Test-ResourceUsage }
        { Test-Cleanup }
    )
    
    foreach ($test in $tests) {
        $results.Total++
        if (& $test) {
            $results.Passed++
        } else {
            $results.Failed++
        }
    }
    
    return $results
}

# =============================================================================
# Main Execution
# =============================================================================

$results = switch ($TestType) {
    "quick" { Run-QuickTest }
    "full" { Run-FullTest }
    "production" { Run-QuickTest }
    "development" { Run-QuickTest }
    default { Run-QuickTest }
}

# Print summary
Write-Host ""
Write-TestHeader "Test Summary"
Write-Host "Total Tests:  $($results.Total)"
Write-ColorOutput "Green" "Passed:       $($results.Passed)"
Write-ColorOutput "Red" "Failed:       $($results.Failed)"

if ($results.Failed -eq 0) {
    Write-Host ""
    Write-ColorOutput "Green" "🎉 All tests passed! Docker setup is working correctly."
    exit 0
} else {
    Write-Host ""
    Write-ColorOutput "Red" "❌ Some tests failed. Please review the output above."
    exit 1
}
