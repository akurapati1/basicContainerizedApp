# basicContainerizedApp

A minimal **Node.js / Express** service used to demonstrate the complete container workflow: Dockerfile best practices, automated tests, and a **GitHub Actions** pipeline that builds and publishes the image to Docker Hub.

## Endpoints
| Route | Response |
|---|---|
| `GET /` | Greeting text |
| `GET /health` | `{"status":"ok","uptime":…}` (used by the Docker `HEALTHCHECK`) |

## Run locally
```bash
npm install
npm start                # http://localhost:3000   (PORT env var overrides)
npm test                 # node:test smoke tests
```

## Run with Docker
```bash
docker build -t docker-github-actions-app .
docker run --rm -p 3000:3000 docker-github-actions-app
curl localhost:3000/health
```
Or pull the published image: `docker run --rm -p 3000:3000 abhilashkurapati557/docker-github-actions-app:latest`

## What the Dockerfile demonstrates
- Small base image (`node:20-alpine`) and **layer caching** (dependencies installed before source is copied)
- Reproducible, production-only installs (`npm ci --omit=dev`)
- Runs as the **non-root** `node` user; built-in `HEALTHCHECK`
- `.dockerignore` keeps the build context lean

## CI/CD (`.github/workflows/docker.yaml`)
1. **test** – install and run the test suite on every push and PR
2. **build** – build the image with Buildx; on pushes to `main` it logs in to Docker Hub and pushes `:latest`

Required repository secrets: `DOCKER_USERNAME`, `DOCKER_PASSWORD` (use a Docker Hub access token).
