FROM node:20-alpine AS development-dependencies-env
RUN corepack enable
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN corepack install
COPY . /app
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS build-env
RUN corepack enable
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN corepack install
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
RUN pnpm prisma:generate
RUN pnpm run build
RUN pnpm prune --prod

FROM node:20-alpine
RUN corepack enable
ENV NODE_ENV=production
COPY ./package.json pnpm-lock.yaml prisma.config.ts /app/
WORKDIR /app
RUN corepack install
COPY ./prisma /app/prisma
COPY --from=build-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs
CMD ["pnpm", "run", "start"]
