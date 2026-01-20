# =============================================================================
# HireDesk UI - Docker Management Scripts (PowerShell)
# =============================================================================
# Usage: .\docker-scripts.ps1 <command>
# =============================================================================

param(
    [Parameter(Position=0)]
    [ValidateSet(
        "build", "build-dev", "build-prod",
        "up", "up-dev", "up-full", "up-prod",
        "down", "down-all",
        "restart", "logs", "logs-follow",
        "shell", "clean", "clean-all",
        "health", "status", "help"
    )]
    [string]$Command = "help"
)

function Show-Help {
    Write-Host @"
╔══════════════════════════════════════════════════════════════╗
║          HireDesk UI - Docker Management Commands            ║
╚══════════════════════════════════════════════════════════════╝

BUILD COMMANDS:
  build           Build production image
  build-dev       Build development image
  build-prod      Build production image with no cache

RUN COMMANDS:
  up              Start production app (port 3000)
  up-dev          Start development mode with hot reload (port 3001)
  up-full         Start all services (app + redis + postgres)
  up-prod         Start with Nginx reverse proxy (port 80)

STOP COMMANDS:
  down            Stop and remove containers
  down-all        Stop all services and remove volumes

UTILITY COMMANDS:
  restart         Restart all running services
  logs            Show logs for all services
  logs-follow     Follow logs in real-time
  shell           Open shell in running container
  health          Check health status of services
  status          Show status of all containers

CLEANUP COMMANDS:
  clean           Remove unused images and containers
  clean-all       Deep clean (images, containers, volumes, networks)

EXAMPLES:
  .\docker-scripts.ps1 build
  .\docker-scripts.ps1 up-dev
  .\docker-scripts.ps1 logs-follow
  .\docker-scripts.ps1 clean
"@
}

function Build-Production {
    Write-Host "Building production image..." -ForegroundColor Cyan
    docker-compose build hiredesk
}

function Build-Development {
    Write-Host "Building development image..." -ForegroundColor Cyan
    docker-compose build hiredesk-dev
}

function Build-ProductionNoCache {
    Write-Host "Building production image (no cache)..." -ForegroundColor Cyan
    docker-compose build --no-cache hiredesk
}

function Start-Production {
    Write-Host "Starting production app on port 3000..." -ForegroundColor Green
    docker-compose up -d hiredesk
    Write-Host "App running at: http://localhost:3000" -ForegroundColor Green
}

function Start-Development {
    Write-Host "Starting development mode on port 3001..." -ForegroundColor Green
    docker-compose --profile dev up -d hiredesk-dev
    Write-Host "Dev server running at: http://localhost:3001" -ForegroundColor Green
    Write-Host "HMR port: 24678" -ForegroundColor Yellow
}

function Start-Full {
    Write-Host "Starting all services..." -ForegroundColor Green
    docker-compose --profile full up -d
    Write-Host @"
Services started:
  App:      http://localhost:3000
  Redis:    localhost:6379
  Postgres: localhost:5432
"@ -ForegroundColor Green
}

function Start-WithNginx {
    Write-Host "Starting production with Nginx..." -ForegroundColor Green
    docker-compose --profile prod up -d
    Write-Host "App running at: http://localhost:80" -ForegroundColor Green
}

function Stop-Containers {
    Write-Host "Stopping containers..." -ForegroundColor Yellow
    docker-compose down
}

function Stop-All {
    Write-Host "Stopping all services and removing volumes..." -ForegroundColor Red
    docker-compose --profile dev --profile full --profile prod down -v
}

function Restart-Services {
    Write-Host "Restarting services..." -ForegroundColor Cyan
    docker-compose restart
}

function Show-Logs {
    docker-compose logs --tail=100
}

function Follow-Logs {
    docker-compose logs -f
}

function Open-Shell {
    $container = docker ps --filter "name=hiredesk" --format "{{.Names}}" | Select-Object -First 1
    if ($container) {
        Write-Host "Opening shell in $container..." -ForegroundColor Cyan
        docker exec -it $container /bin/sh
    } else {
        Write-Host "No running HireDesk container found!" -ForegroundColor Red
    }
}

function Check-Health {
    Write-Host "Health Status:" -ForegroundColor Cyan
    docker-compose ps --format json | ConvertFrom-Json | ForEach-Object {
        $status = if ($_.Health -eq "healthy") { "✓ Healthy" } elseif ($_.Health -eq "unhealthy") { "✗ Unhealthy" } else { "- No healthcheck" }
        Write-Host "$($_.Name): $status" -ForegroundColor $(if ($_.Health -eq "healthy") { "Green" } elseif ($_.Health -eq "unhealthy") { "Red" } else { "Yellow" })
    }
}

function Show-Status {
    Write-Host "Container Status:" -ForegroundColor Cyan
    docker-compose ps
}

function Clean-Docker {
    Write-Host "Cleaning unused Docker resources..." -ForegroundColor Yellow
    docker system prune -f
}

function Clean-All {
    Write-Host "Performing deep clean..." -ForegroundColor Red
    Write-Host "This will remove all HireDesk images, containers, volumes, and networks!" -ForegroundColor Red
    $confirm = Read-Host "Are you sure? (y/N)"
    if ($confirm -eq "y") {
        docker-compose --profile dev --profile full --profile prod down -v --rmi all
        docker system prune -af --volumes
        Write-Host "Deep clean completed!" -ForegroundColor Green
    } else {
        Write-Host "Cancelled." -ForegroundColor Yellow
    }
}

# Execute command
switch ($Command) {
    "build"        { Build-Production }
    "build-dev"    { Build-Development }
    "build-prod"   { Build-ProductionNoCache }
    "up"           { Start-Production }
    "up-dev"       { Start-Development }
    "up-full"      { Start-Full }
    "up-prod"      { Start-WithNginx }
    "down"         { Stop-Containers }
    "down-all"     { Stop-All }
    "restart"      { Restart-Services }
    "logs"         { Show-Logs }
    "logs-follow"  { Follow-Logs }
    "shell"        { Open-Shell }
    "health"       { Check-Health }
    "status"       { Show-Status }
    "clean"        { Clean-Docker }
    "clean-all"    { Clean-All }
    "help"         { Show-Help }
    default        { Show-Help }
}
