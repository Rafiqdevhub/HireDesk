# HireDesk UI - Docker Quick Start

## Get Started in 3 Minutes

### Prerequisites

- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- 4GB RAM available
- 5GB disk space

### Step 1: Setup Environment

```powershell
# Copy environment file
Copy-Item .env.example .env

# (Optional) Edit configuration
notepad .env
```

### Step 2: Choose Your Mode

#### Production Mode (Recommended for Testing)

```powershell
# Build and start
docker-compose up -d hiredesk

# Or use the script
.\docker-scripts.ps1 up

# Access at http://localhost:3000
```

#### Development Mode (For Coding)

```powershell
# Build and start with hot reload
docker-compose --profile dev up -d hiredesk-dev

# Or use the script
.\docker-scripts.ps1 up-dev

# Access at http://localhost:3001
```

#### Full Stack Mode (All Services)

```powershell
# Start everything (App + Redis + PostgreSQL)
docker-compose --profile full up -d

# Or use the script
.\docker-scripts.ps1 up-full
```

### Step 3: Verify It's Running

```powershell
# Check status
docker-compose ps

# View logs
docker-compose logs -f hiredesk

# Or use the script
.\docker-scripts.ps1 status
```

---

## Available Commands

### Using PowerShell Scripts (Easiest)

```powershell
.\docker-scripts.ps1 help          # Show all commands
.\docker-scripts.ps1 build         # Build production
.\docker-scripts.ps1 up            # Start production
.\docker-scripts.ps1 up-dev        # Start development
.\docker-scripts.ps1 logs-follow   # View logs
.\docker-scripts.ps1 down          # Stop everything
```

### Using Makefile

```powershell
make help                          # Show all commands
make build                         # Build production
make up                            # Start production
make up-dev                        # Start development
make logs-follow                   # View logs
make down                          # Stop everything
```

### Using Docker Compose

```powershell
docker-compose build hiredesk               # Build
docker-compose up -d hiredesk               # Start production
docker-compose --profile dev up -d          # Start dev mode
docker-compose logs -f                      # View logs
docker-compose down                         # Stop
```

---

## Common Tasks

### View Real-time Logs

```powershell
docker-compose logs -f hiredesk
```

### Open Shell in Container

```powershell
docker exec -it hiredesk-app /bin/sh
```

### Restart Services

```powershell
docker-compose restart
```

### Stop and Clean Up

```powershell
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Rebuild from Scratch

```powershell
# Stop everything
docker-compose down -v

# Rebuild without cache
docker-compose build --no-cache

# Start again
docker-compose up -d
```

---

## Troubleshooting

### Port 3000 Already in Use

```powershell
# Find process using the port
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F

# Or change port in .env
APP_PORT=3001
```

### Container Won't Start

```powershell
# Check logs for errors
docker-compose logs hiredesk

# Check container status
docker ps -a

# Restart container
docker-compose restart hiredesk
```

### Build Fails

```powershell
# Clean everything and rebuild
docker-compose down -v
docker system prune -af
docker-compose build --no-cache
docker-compose up -d
```

### Hot Reload Not Working (Dev Mode)

```powershell
# Already configured, but verify in .env:
CHOKIDAR_USEPOLLING=true
WATCHPACK_POLLING=true

# Restart dev container
docker-compose --profile dev restart hiredesk-dev
```

---

## Access Points

### Production Mode

- **App**: http://localhost:3000
- **API** (if backend running): http://localhost:5000/api

### Development Mode

- **App**: http://localhost:3001
- **HMR**: Port 24678 (automatic)

### Full Stack Mode

- **App**: http://localhost:3000
- **Redis**: localhost:6379
- **PostgreSQL**: localhost:5432

### With Nginx (Production)

- **App**: http://localhost:80

---

## Tips

1. **Use Dev Mode** when actively coding - changes reflect instantly
2. **Use Production Mode** for testing the final build
3. **Check logs often** - they tell you what's happening
4. **Clean up regularly** - run `docker system prune -f` weekly
5. **Update base images** - run `docker pull node:20-alpine` monthly

---

## Need Help?

1. Check logs: `docker-compose logs hiredesk`
2. Check status: `docker-compose ps`
3. See full docs: [DOCKER.md](./DOCKER.md)
4. Open an issue on GitHub

---
