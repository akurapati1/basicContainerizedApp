# syntax=docker/dockerfile:1
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Install production dependencies first to leverage layer caching
COPY package*.json ./
RUN npm ci --omit=dev

COPY app.js ./

# Run as the unprivileged user shipped with the node image
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "app.js"]
