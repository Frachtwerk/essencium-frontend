# syntax=docker.io/docker/dockerfile:1
# Based on the official Next.js Dockerfile example
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Install dependencies only when needed
FROM dhi.io/node:24-alpine3.23-dev AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml .npmrc* ./
COPY packages/app/package.json ./packages/app/
COPY packages/lib/package.json ./packages/lib/
COPY packages/types/package.json ./packages/types/

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    corepack enable pnpm && \
    pnpm i --frozen-lockfile --store-dir=/root/.local/share/pnpm/store;

# Rebuild the source code only when needed
FROM dhi.io/node:24-alpine3.23-dev AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY . .

ARG NODE_ENV=production
COPY ./packages/app/.env.${NODE_ENV}* ./packages/app/.env.local

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable pnpm && pnpm run build;

# Production image, copy all the files and run next
FROM dhi.io/node:24-alpine3.23 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

# Standalone build output is spread across multiple directories for monorepos.
# See https://github.com/vercel/next.js/discussions/35437
COPY --from=builder --chown=node:node /app/packages/app/.next/standalone ./
COPY --from=builder --chown=node:node /app/packages/app/public ./packages/app/public
COPY --from=builder --chown=node:node /app/packages/app/.next/static ./packages/app/.next/static

USER node

EXPOSE 3000

HEALTHCHECK --interval=60s --timeout=30s --start-period=30s --retries=3 \
    CMD ["node", "-e", "require('http').get('http://localhost:3000/api/health', res => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"]

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "./packages/app/server.js"]