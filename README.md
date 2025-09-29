# HireDesk - AI-Powered Recruitment Platform

![HireDesk Logo](public/logo/logo.png)

## HireDesk

Transform your hiring process with AI-powered candidate analysis

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-38B2AC.svg)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.7.1-CA4245.svg)](https://reactrouter.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://www.docker.com/)

## 🌟 Overview

HireDesk is a modern, AI-powered recruitment platform that revolutionizes the hiring process. Upload resumes, analyze candidates with advanced AI, generate tailored interview questions, and make data-driven hiring decisions with confidence.

### ✨ Key Features

- **🤖 AI-Powered Resume Analysis**: Intelligent parsing and candidate profiling
- **🎯 Smart Skills Matching**: Automated matching of candidate skills to job requirements
- **❓ Interview Question Generation**: AI-generated, role-specific interview questions
- **📊 Candidate Scoring**: Comprehensive fit analysis with detailed reasoning
- **💾 Data Persistence**: All analysis results persist across browser sessions
- **🔐 Secure Authentication**: User registration and login system
- **📱 Responsive Design**: Modern, mobile-first UI with glassmorphism effects
- **⚡ Real-time Processing**: Fast, efficient analysis with loading states

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rafiqdevhub/HireDesk.git
   cd hiredesk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Configure your environment variables in `.env`:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=HireDesk
   VITE_APP_VERSION=1.0.0
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```bash
hiredesk/
├── app/                          # Main application code
│   ├── components/               # Reusable UI components
│   │   ├── auth/                 # Authentication components
│   │   ├── layout/               # Layout components (Navbar, Footer)
│   │   ├── resume/               # Resume-related components
│   │   ├── toast/                # Notification components
│   │   └── ui/                   # Base UI components
│   ├── contexts/                 # React contexts (Auth, Toast)
│   ├── data/                     # Static data and configurations
│   ├── hooks/                    # Custom React hooks
│   ├── routes/                   # Page components and routing
│   ├── services/                 # API service functions
│   ├── utils/                    # Utility functions
│   └── root.tsx                  # Application root component
├── public/                       # Static assets
├── build/                        # Production build output
├── .env.example                  # Environment variables template
├── Dockerfile                    # Docker configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite build configuration
```

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run typecheck    # Run TypeScript type checking

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Development Guidelines

#### 🔄 Git Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the established patterns

3. **Test your changes**

   ```bash
   npm run dev
   npm run typecheck
   ```

4. **Commit with conventional commits**

   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push and create a pull request**

   ```bash
   git push origin feature/your-feature-name
   ```

#### 📝 Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Automatic code formatting
- **Tailwind CSS**: Utility-first CSS framework
- **Component Structure**: Functional components with hooks

#### 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests with coverage
npm run test:coverage
```

## 🎨 UI/UX Design System

### Color Palette

- **Primary**: Slate grays with blue accents
- **Background**: Clean white/light gray with glassmorphism effects
- **Accent**: Blue (#3B82F6) and purple (#8B5CF6) gradients (removed in favor of flat design)
- **Semantic**: Green for success, red for errors, yellow for warnings

### Design Principles

- **Glassmorphism**: Semi-transparent elements with backdrop blur
- **Minimalism**: Clean, focused design with ample white space
- **Accessibility**: WCAG compliant contrast ratios and keyboard navigation
- **Mobile-First**: Responsive design that works on all devices
- **Modern Aesthetics**: Contemporary UI patterns and micro-interactions

## 🔌 API Integration

### External Services

HireDesk integrates with AI-powered backend services for:

- **Resume Analysis**: `https://hr-resume-analyzer-backend.vercel.app/api/hiredesk-analyze`
- **Question Generation**: `https://hr-resume-analyzer-backend.vercel.app/api/generate-questions`

### API Response Structure

#### Resume Analysis Response

```typescript
{
  resumeData: {
    personalInfo: {...},
    workExperience: [...],
    education: [...],
    skills: [...]
  },
  roleRecommendations: [
    {
      roleName: string,
      matchPercentage: number,
      reasoning: string,
      requiredSkills: string[],
      missingSkills: string[],
      careerLevel: string,
      industryFit: string
    }
  ],
  questions: [
    {
      question: string,
      type: "technical" | "behavioral" | "experience",
      context?: string
    }
  ],
  fit_status: string,
  reasoning: string
}
```

## 🚀 Deployment

### 🐳 Docker Hub Image

HireDesk is available as a pre-built Docker image on Docker Hub, making deployment incredibly simple.

#### Pull the Official Image

```bash
# Pull the latest version
docker pull rafiq9323/hiredesk:latest

# Or pull a specific version/tag
docker pull rafiq9323/hiredesk:master
```

#### Run with Docker Hub Image

```bash
# Run the container
docker run -d \
  --name hiredesk \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e VITE_API_URL=https://jobpsych-payment.vercel.app/api \
  rafiq9323/hiredesk:latest

# Access at http://localhost:3000
```

### 🐙 Docker Compose Setup

For a complete development or production environment, use Docker Compose with multiple services.

#### Quick Start with Docker Compose

```bash
# Clone the repository
git clone https://github.com/Rafiqdevhub/HireDesk.git
cd hiredesk

# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

#### Available Docker Compose Profiles

The `docker-compose.yml` includes multiple profiles for different environments:

##### Production Profile (Default)

```bash
# Start production environment with Nginx reverse proxy
docker compose --profile prod up -d

# Includes: hiredesk (app), nginx (reverse proxy)
```

##### Development Profile

```bash
# Start development environment with hot reload
docker compose --profile dev up -d

# Includes: hiredesk-dev (hot reload), mock-backend (API simulation)
```

##### Full Profile (Complete Stack)

```bash
# Start complete environment with all services
docker compose --profile full up -d

# Includes: hiredesk, redis (caching), postgres (database)
```

#### Docker Compose Services Overview

| Service        | Profile | Purpose                       | Port   |
| -------------- | ------- | ----------------------------- | ------ |
| `hiredesk`     | prod    | Production React app with SSR | 3000   |
| `hiredesk-dev` | dev     | Development with hot reload   | 3001   |
| `mock-backend` | dev     | Mock API for development      | 5000   |
| `nginx`        | prod    | Reverse proxy & load balancer | 80/443 |
| `redis`        | full    | Caching layer                 | 6379   |
| `postgres`     | full    | Database (future features)    | 5432   |

#### Environment Variables for Docker Compose

Create a `.env` file or set environment variables:

```env
# Application Configuration
NODE_ENV=production
VITE_API_URL=https://jobpsych-payment.vercel.app/api
VITE_APP_NAME=HireDesk
VITE_APP_VERSION=1.0.0

# Database (for full profile)
POSTGRES_DB=hiredesk
POSTGRES_USER=hiredesk_user
POSTGRES_PASSWORD=your_secure_password

# Redis (for full profile)
REDIS_PASSWORD=your_redis_password
```

#### Docker Compose Commands

```bash
# Build and start all services
docker compose up --build

# Start in background
docker compose up -d

# View service status
docker compose ps

# View logs for specific service
docker compose logs hiredesk

# Scale services (if needed)
docker compose up -d --scale hiredesk=3

# Clean up
docker compose down --volumes --remove-orphans
```

### 🔄 CI/CD Pipeline

HireDesk uses GitHub Actions for automated building and deployment.

#### Automated Docker Builds

Every push to `master` or `main` branch automatically:

1. **Builds** the Docker image using multi-stage Dockerfile
2. **Tags** the image with multiple strategies:
   - `latest` - Latest stable version
   - `master` - Branch-specific tag
   - `master-<commit-sha>` - Unique commit tags
3. **Pushes** to Docker Hub (`rafiq9323/hiredesk`)
4. **Caches** layers for faster subsequent builds

#### GitHub Actions Workflow

The CI/CD pipeline is defined in `.github/workflows/docker-push-image.yml`:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - name: Set up Docker Buildx
      - name: Login to Docker Hub
      - name: Build and push image
```

#### Required GitHub Secrets

Set these secrets in your repository settings:

- `DOCKER_USERNAME`: `rafiq9323`
- `DOCKER_PASSWORD`: Your Docker Hub Personal Access Token

#### Pipeline Benefits

- **Automated Deployment**: No manual intervention required
- **Version Control**: Proper tagging for rollbacks
- **Security**: Automated security scanning
- **Performance**: Layer caching for faster builds
- **Multi-Platform**: Ready for ARM64/x86_64 builds

### 🏭 Build Your Own Docker Image

If you want to build the image locally:

```bash
# Build from source
docker build -t hiredesk .

# Build with specific Dockerfile
docker build -f Dockerfile.dev -t hiredesk-dev .

# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t hiredesk .
```

### 🌐 Production Deployment Options

#### Option 1: Docker Hub + Docker Compose (Recommended)

```bash
# Use pre-built image
docker compose up -d
```

#### Option 2: Kubernetes Deployment

```bash
# Use the Docker Hub image in your K8s manifests
kubectl apply -f k8s/
```

#### Option 3: Cloud Platforms

- **Railway**: Connect GitHub repo, auto-deploys
- **Render**: Use Docker image from Docker Hub
- **Fly.io**: Deploy from Docker Hub image
- **AWS ECS**: Use Docker Hub image in task definitions

### 🔍 Monitoring & Troubleshooting

#### Health Checks

```bash
# Check container health
docker ps

# View application logs
docker compose logs hiredesk

# Test application health
curl http://localhost:3000
```

#### Common Issues

**Port already in use:**

```bash
# Find process using port 3000
netstat -tulpn | grep :3000

# Kill the process or change port mapping
docker run -p 3001:3000 rafiq9323/hiredesk:latest
```

**Permission issues:**

```bash
# Run as non-root user
docker run --user node rafiq9323/hiredesk:latest
```

**Memory issues:**

```bash
# Limit memory usage
docker run -m 512m rafiq9323/hiredesk:latest
```

### 📊 Resource Requirements

- **CPU**: 0.5 vCPU minimum, 1 vCPU recommended
- **Memory**: 512MB minimum, 1GB recommended
- **Storage**: 200MB for application, plus logs
- **Network**: Standard HTTP/HTTPS ports (80/443)

### 🔒 Security Best Practices

- Use Docker Hub images from trusted sources
- Regularly update base images
- Scan images for vulnerabilities
- Use secrets management for sensitive data
- Implement proper network segmentation
- Enable HTTPS in production

## 🔐 Authentication

HireDesk includes a complete authentication system:

- **User Registration**: Email/password signup
- **User Login**: Secure authentication with JWT tokens
- **Protected Routes**: Route-level protection for authenticated users
- **Profile Management**: User profile updates and management
- **Session Persistence**: Automatic login state management

## 💾 Data Persistence

All analysis results are automatically persisted using localStorage:

- **Resume Data**: Parsed resume information
- **Analysis Results**: Fit status, reasoning, and recommendations
- **Generated Questions**: Interview questions with categories
- **UI State**: Expanded/collapsed states for question categories

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Update documentation** as needed
6. **Submit a pull request** with a clear description

### Contribution Guidelines

- **Code Style**: Follow the established TypeScript and React patterns
- **Commits**: Use conventional commit format
- **PRs**: Provide clear descriptions and link to issues
- **Testing**: Ensure all tests pass before submitting
- **Documentation**: Update README and code comments as needed

### Development Setup for Contributors

```bash
# Clone your fork
git clone https://github.com/your-username/HireDesk.git
cd hiredesk

# Install dependencies
npm install

# Set up pre-commit hooks (if available)
npm run prepare

# Start development
npm run dev
```

## 🙏 Acknowledgments

- **React Router** for the excellent routing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Heroicons** for the beautiful icon set
- **Vite** for the fast build tool
- **AI Backend Services** for powering the intelligent analysis

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Rafiqdevhub/HireDesk/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Rafiqdevhub/HireDesk/discussions)
- **Email**: For business inquiries or support

---

Built with ❤️ using React, TypeScript, and AI

_Transforming recruitment, one resume at a time._
