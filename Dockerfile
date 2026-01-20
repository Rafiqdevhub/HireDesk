# HireDesk Frontend - Production Dockerfile
# Multi-stage build for optimized production image with React Router v7

# ============================================================================
# Stage 1: Dependencies
# ============================================================================
FROM node:20-alpine AS dependencies

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci --legacy-peer-deps

# ============================================================================
# Stage 2: Build
# ============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and dependencies
COPY package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules

# Copy configuration files
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY react-router.config.ts ./

# Copy source code
COPY app ./app
COPY public ./public
COPY types ./types

# Build the React Router application
RUN npm run build

# ============================================================================
# Stage 3: Production Runtime
# ============================================================================
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init and curl for health checks
RUN apk add --no-cache dumb-init curl

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --legacy-peer-deps && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Set ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Environment variables
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the React Router application
CMD ["npm", "run", "start"]