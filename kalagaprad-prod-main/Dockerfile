# --- Dockerfile for Frontend (React) ---
# Stage 1: Build the React application
FROM node:22-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy all project files
COPY . .

# Install dependencies
RUN npm ci

# Build the React application for production
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]