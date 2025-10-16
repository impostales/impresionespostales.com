FROM node:20-alpine AS development-dependencies-env
RUN corepack enable
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN corepack install
COPY . /app
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS production-dependencies-env
RUN corepack enable
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN corepack install
RUN pnpm install --frozen-lockfile --prod

FROM node:20-alpine AS build-env
RUN corepack enable
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN corepack install
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
RUN pnpm run build

FROM node:20-alpine
RUN corepack enable
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN corepack install
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
CMD ["pnpm", "run", "start"]