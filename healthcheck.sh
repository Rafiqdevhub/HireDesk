#!/bin/sh
# =============================================================================
# HireDesk UI - Docker Health Check Script
# =============================================================================
# This script checks if the application is healthy and ready to serve traffic
# =============================================================================

set -e

# Configuration
APP_HOST="${HOST:-0.0.0.0}"
APP_PORT="${PORT:-3000}"
HEALTH_ENDPOINT="http://${APP_HOST}:${APP_PORT}"
MAX_RETRIES=3
RETRY_DELAY=2

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log_success() {
    echo "${GREEN}✓ $1${NC}"
}

log_error() {
    echo "${RED}✗ $1${NC}"
}

log_warning() {
    echo "${YELLOW}⚠ $1${NC}"
}

# =============================================================================
# Health Checks
# =============================================================================

# Check 1: HTTP endpoint is reachable
check_http_endpoint() {
    log "Checking HTTP endpoint at ${HEALTH_ENDPOINT}..."
    
    if command -v curl > /dev/null 2>&1; then
        if curl -f -s -o /dev/null "${HEALTH_ENDPOINT}"; then
            log_success "HTTP endpoint is reachable"
            return 0
        else
            log_error "HTTP endpoint is not reachable"
            return 1
        fi
    elif command -v wget > /dev/null 2>&1; then
        if wget -q -O /dev/null "${HEALTH_ENDPOINT}"; then
            log_success "HTTP endpoint is reachable"
            return 0
        else
            log_error "HTTP endpoint is not reachable"
            return 1
        fi
    else
        log_error "Neither curl nor wget available"
        return 1
    fi
}

# Check 2: Process is running
check_process() {
    log "Checking if Node.js process is running..."
    
    if pgrep -x node > /dev/null; then
        log_success "Node.js process is running"
        return 0
    else
        log_error "Node.js process is not running"
        return 1
    fi
}

# Check 3: Memory usage is reasonable
check_memory() {
    log "Checking memory usage..."
    
    if command -v free > /dev/null 2>&1; then
        MEMORY_PERCENT=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
        MEMORY_INT=$(printf "%.0f" "${MEMORY_PERCENT}")
        
        if [ "${MEMORY_INT}" -lt 90 ]; then
            log_success "Memory usage is healthy (${MEMORY_INT}%)"
            return 0
        else
            log_warning "Memory usage is high (${MEMORY_INT}%)"
            return 1
        fi
    else
        log_warning "Cannot check memory usage (free command not available)"
        return 0
    fi
}

# Check 4: Disk space is available
check_disk() {
    log "Checking disk space..."
    
    DISK_PERCENT=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')
    
    if [ "${DISK_PERCENT}" -lt 90 ]; then
        log_success "Disk space is healthy (${DISK_PERCENT}% used)"
        return 0
    else
        log_warning "Disk space is low (${DISK_PERCENT}% used)"
        return 1
    fi
}

# =============================================================================
# Main Health Check
# =============================================================================

main() {
    log "Starting health check for HireDesk UI..."
    
    FAILURES=0
    
    # Run all checks
    check_process || FAILURES=$((FAILURES + 1))
    check_http_endpoint || FAILURES=$((FAILURES + 1))
    check_memory || true  # Non-critical
    check_disk || true    # Non-critical
    
    # Evaluate results
    if [ "${FAILURES}" -eq 0 ]; then
        log_success "All health checks passed"
        exit 0
    elif [ "${FAILURES}" -le 1 ]; then
        log_warning "Some health checks failed, but container is still functional"
        exit 0
    else
        log_error "Health check failed with ${FAILURES} failures"
        exit 1
    fi
}

# Run health check
main
