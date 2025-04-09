# Docker Setup Guide

This document outlines the Docker configuration for our project, including development and production environments.

## Overview

We use Docker for both development and production environments, with separate configurations optimized for each use case. The setup includes:

- Multi-stage builds for production
- Development environment with hot-reloading
- Volume mounts for efficient development
- Security best practices
- Health checks for production

## Development

To start the development environment:

```bash
docker compose up web-dev
```

This will:
- Build the development container
- Mount your local code into the container
- Enable hot-reloading
- Expose port 3000

## Production

To run the production environment:

```bash
docker compose up web-prod
```

The production build:
- Uses multi-stage builds to minimize image size
- Implements security best practices
- Includes health checks
- Runs as a non-root user

## Environment Variables

Create a `.env` file in the root directory with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Best Practices

1. **Development**:
   - Use `docker compose up web-dev` for local development
   - Changes to your local files will be reflected immediately
   - Node modules are cached in a Docker volume

2. **Production**:
   - Use `docker compose up web-prod` for production-like environment
   - The build process is optimized for production
   - Includes health checks and automatic restarts

3. **Security**:
   - All containers run as non-root users
   - Production builds use multi-stage builds
   - Sensitive environment variables are passed through `.env`

4. **Performance**:
   - Development uses volume mounts for fast file access
   - Production uses optimized multi-stage builds
   - Node modules are properly cached

## Common Commands

```bash
# Start development environment
docker compose up web-dev

# Start production environment
docker compose up web-prod

# Rebuild containers
docker compose build

# View logs
docker compose logs -f

# Stop all containers
docker compose down
```

## Troubleshooting

1. **Port Conflicts**:
   - If port 3000 is already in use, modify the port mapping in `docker-compose.yml`

2. **Build Issues**:
   - Clear Docker cache: `docker builder prune`
   - Rebuild from scratch: `docker compose build --no-cache`

3. **Volume Issues**:
   - Reset volumes: `docker compose down -v`
   - Rebuild: `docker compose up --build`

## Contributing

When adding new dependencies:
1. Update `package.json`
2. Rebuild the containers: `docker compose build`
3. Restart the environment: `docker compose up`

## CI/CD Integration

The Docker setup is designed to work seamlessly with our CI/CD pipeline:
- Production builds use the multi-stage Dockerfile
- Health checks ensure deployment success
- Environment variables are managed through CI/CD secrets 