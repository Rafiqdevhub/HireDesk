# =============================================================================
# HireDesk UI - Makefile for Docker Management
# =============================================================================
# Usage: make <target>
# For Windows, use: mingw32-make <target> or install GNU Make
# =============================================================================

.PHONY: help build build-dev build-prod up up-dev up-full up-prod down down-all \
        restart logs logs-follow shell health status clean clean-all

# Default target
.DEFAULT_GOAL := help

# Colors for output (works in most terminals)
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# =============================================================================
# HELP
# =============================================================================
help: ## Show this help message
	@echo "╔══════════════════════════════════════════════════════════════╗"
	@echo "║          HireDesk UI - Docker Management Commands            ║"
	@echo "╚══════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "BUILD COMMANDS:"
	@echo "  make build           Build production image"
	@echo "  make build-dev       Build development image"
	@echo "  make build-prod      Build production image with no cache"
	@echo ""
	@echo "RUN COMMANDS:"
	@echo "  make up              Start production app (port 3000)"
	@echo "  make up-dev          Start development mode (port 3001)"
	@echo "  make up-full         Start all services (app + redis + postgres)"
	@echo "  make up-prod         Start with Nginx reverse proxy (port 80)"
	@echo ""
	@echo "STOP COMMANDS:"
	@echo "  make down            Stop and remove containers"
	@echo "  make down-all        Stop all services and remove volumes"
	@echo ""
	@echo "UTILITY COMMANDS:"
	@echo "  make restart         Restart all running services"
	@echo "  make logs            Show logs for all services"
	@echo "  make logs-follow     Follow logs in real-time"
	@echo "  make shell           Open shell in running container"
	@echo "  make health          Check health status of services"
	@echo "  make status          Show status of all containers"
	@echo ""
	@echo "CLEANUP COMMANDS:"
	@echo "  make clean           Remove unused images and containers"
	@echo "  make clean-all       Deep clean (images, containers, volumes)"
	@echo ""

# =============================================================================
# BUILD COMMANDS
# =============================================================================
build: ## Build production image
	@echo "$(CYAN)Building production image...$(NC)"
	docker-compose build hiredesk
	@echo "$(GREEN)✓ Build complete!$(NC)"

build-dev: ## Build development image
	@echo "$(CYAN)Building development image...$(NC)"
	docker-compose build hiredesk-dev
	@echo "$(GREEN)✓ Build complete!$(NC)"

build-prod: ## Build production image with no cache
	@echo "$(CYAN)Building production image (no cache)...$(NC)"
	docker-compose build --no-cache hiredesk
	@echo "$(GREEN)✓ Build complete!$(NC)"

# =============================================================================
# RUN COMMANDS
# =============================================================================
up: ## Start production app
	@echo "$(GREEN)Starting production app on port 3000...$(NC)"
	docker-compose up -d hiredesk
	@echo "$(GREEN)✓ App running at: http://localhost:3000$(NC)"

up-dev: ## Start development mode with hot reload
	@echo "$(GREEN)Starting development mode on port 3001...$(NC)"
	docker-compose --profile dev up -d hiredesk-dev
	@echo "$(GREEN)✓ Dev server: http://localhost:3001$(NC)"
	@echo "$(YELLOW)✓ HMR port: 24678$(NC)"

up-full: ## Start all services
	@echo "$(GREEN)Starting all services...$(NC)"
	docker-compose --profile full up -d
	@echo "$(GREEN)✓ Services started:$(NC)"
	@echo "  App:      http://localhost:3000"
	@echo "  Redis:    localhost:6379"
	@echo "  Postgres: localhost:5432"

up-prod: ## Start with Nginx reverse proxy
	@echo "$(GREEN)Starting production with Nginx...$(NC)"
	docker-compose --profile prod up -d
	@echo "$(GREEN)✓ App running at: http://localhost:80$(NC)"

# =============================================================================
# STOP COMMANDS
# =============================================================================
down: ## Stop and remove containers
	@echo "$(YELLOW)Stopping containers...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Containers stopped$(NC)"

down-all: ## Stop all services and remove volumes
	@echo "$(RED)Stopping all services and removing volumes...$(NC)"
	docker-compose --profile dev --profile full --profile prod down -v
	@echo "$(GREEN)✓ All services stopped$(NC)"

# =============================================================================
# UTILITY COMMANDS
# =============================================================================
restart: ## Restart all running services
	@echo "$(CYAN)Restarting services...$(NC)"
	docker-compose restart
	@echo "$(GREEN)✓ Services restarted$(NC)"

logs: ## Show logs for all services
	docker-compose logs --tail=100

logs-follow: ## Follow logs in real-time
	docker-compose logs -f

shell: ## Open shell in running container
	@echo "$(CYAN)Opening shell in container...$(NC)"
	@docker exec -it $$(docker ps --filter "name=hiredesk" --format "{{.Names}}" | head -n1) /bin/sh || echo "$(RED)No running container found!$(NC)"

health: ## Check health status of services
	@echo "$(CYAN)Health Status:$(NC)"
	@docker-compose ps --format json | jq -r '.[] | "\(.Name): \(.Health // "No healthcheck")"'

status: ## Show status of all containers
	@echo "$(CYAN)Container Status:$(NC)"
	@docker-compose ps

# =============================================================================
# CLEANUP COMMANDS
# =============================================================================
clean: ## Remove unused images and containers
	@echo "$(YELLOW)Cleaning unused Docker resources...$(NC)"
	docker system prune -f
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

clean-all: ## Deep clean (images, containers, volumes, networks)
	@echo "$(RED)WARNING: This will remove all HireDesk images, containers, volumes!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker-compose --profile dev --profile full --profile prod down -v --rmi all; \
		docker system prune -af --volumes; \
		echo "$(GREEN)✓ Deep clean complete$(NC)"; \
	else \
		echo "$(YELLOW)Cancelled$(NC)"; \
	fi
