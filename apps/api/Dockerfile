# Stage 1: Prune the workspace
FROM node:24.15.0-slim AS builde
WORKDIR /app
RUN npm install -g turbo
COPY . .
# This command extracts only the code needed for 'api' and its dependencies
RUN turbo prune @my-project/api --docker

# Stage 2: Install and Build
FROM node:24.15.0-slim AS installe
WORKDIR /app

# Copy the pruned lockfile and package.json from the previous stage
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Copy the actual source code
COPY --from=builder /app/out/full/ .
RUN npx turbo build --filter=@my-project/api

# Stage 3: Runner
FROM node:24.15.0-slim AS runne
WORKDIR /app
COPY --from=installer /app .

CMD ["node", "apps/api/dist/main.js"]
