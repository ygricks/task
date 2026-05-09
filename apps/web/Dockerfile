# Stage 1: Prune the workspace
FROM node:24.15.0-slim AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
# Only extract what is needed for the web app and its dependencies (like @my-project/types)
RUN turbo prune @my-project/web --docker

# Stage 2: Install and Build
FROM node:24.15.0-slim AS installer
WORKDIR /app

# Copy pruned locks and package.json
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Copy source code and build
COPY --from=builder /app/out/full/ .
# Vite build happens here
RUN npx turbo build --filter=@my-project/web

# Stage 3: Runner (Nginx)
FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

# Clean the default nginx public files
RUN rm -rf ./*

# Copy the build output from the installer stage
# Note: Vite usually outputs to 'dist', and in a monorepo it's inside the app folder
COPY --from=installer /app/apps/web/dist .

# Optional: Copy a custom nginx config if you have one for SPA routing
# COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
