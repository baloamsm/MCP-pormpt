# MCP Media Generator — production image
# Fallback deployment option (if you prefer Docker runtime on Render):
#   Runtime: Docker
#   Render builds this Dockerfile automatically.
FROM oven/bun:1

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies (cached layer)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the app (output: standalone)
COPY . .
RUN bun run build

# Runtime settings — Render injects its own PORT, Next reads it
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["bun", ".next/standalone/server.js"]
