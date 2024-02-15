FROM node:18-alpine

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

RUN mkdir .next

RUN chown nextjs:nodejs .next

COPY --chown=nextjs:nodejs ./public ./public

COPY --chown=nextjs:nodejs ./.next/standalone ./

COPY --chown=nextjs:nodejs ./.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"
ENV SMTP_HOST=
ENV SMTP_PORT=
ENV SMTP_USER=
ENV SMTP_PASSWORD=
ENV MAIL_FROM=
ENV MAIL_TO=
ENV ADMIN_USERNAME=
ENV ADMIN_PASSWORD=
ENV TEST_ADMIN_USERNAME=
ENV TEST_ADMIN_PASSWORD=
ENV VITE_SENTRY_DSN=
ENV SENTRY_URL=
ENV SENTRY_ORG=
ENV SENTRY_PROJECT=
ENV SENTRY_AUTH_TOKEN=

CMD ["node", "/packages/app/server.js"]