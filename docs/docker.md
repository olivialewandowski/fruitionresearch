# Docker Quick Reference Guide

## Essential Commands

# only restart doicker when

- you install new dependencies/npm packages
- you changed docker configuration or docker-related files
- you changed enviroment variables

# best practice workflow:

- start dev enviroment once at beginning of work session using:
  docker compose up web-dev

### Development

```bash
# Start development environment
docker compose up web-dev

# Stop development environment
docker compose down

# Rebuild development container (after package.json changes)
docker compose build web-dev
```

### Production

```bash
# Start production environment
docker compose up web-prod

# Stop production environment
docker compose down

# Rebuild production container
docker compose build web-prod
```

### General Commands

```bash
# View logs
docker compose logs -f

# View running containers
docker compose ps

# Clean up unused containers/images
docker compose down --remove-orphans
```

## When to Use Each Command

### Development Workflow

1. Start your day:

   ```bash
   docker compose up web-dev
   ```

   - This starts your development environment
   - Changes to your code will automatically reload
   - Access your app at http://localhost:3000

2. After installing new npm packages:

   ```bash
   docker compose build web-dev
   docker compose up web-dev
   ```

3. End your day:
   ```bash
   docker compose down
   ```

### Production Workflow

1. Deploy new version:

   ```bash
   docker compose build web-prod
   docker compose up web-prod
   ```

2. Check production logs:
   ```bash
   docker compose logs -f web-prod
   ```

## Troubleshooting

### Common Issues

1. Port 3000 already in use:

   ```bash
   # Find process using port 3000
   lsof -i :3000
   # Kill the process or change port in docker-compose.yml
   ```

2. Container won't start:

   ```bash
   # Clean everything and start fresh
   docker compose down
   docker compose build --no-cache
   docker compose up web-dev
   ```

3. Node modules issues:
   ```bash
   # Remove node_modules volume and rebuild
   docker compose down -v
   docker compose up web-dev
   ```

## Environment Setup

1. Create `.env` file in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

2. First time setup:

```bash
docker compose build
docker compose up web-dev
```

> Note: Always use `web-dev` for development and `web-prod` for production-like environments.
