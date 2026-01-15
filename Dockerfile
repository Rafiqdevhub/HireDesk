# HireDesk Frontend - Production Dockerfile
# Multi-stage build for optimized production image

# ============================================================================
# Stage 1: Dependencies
# ============================================================================
FROM node:20-alpine AS dependencies

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm ci

# ============================================================================
# Stage 2: Build
# ============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy dependencies from previous stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ============================================================================
# Stage 3: Production Runtime
# ============================================================================
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Set permissions
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["npm", "run", "start"]