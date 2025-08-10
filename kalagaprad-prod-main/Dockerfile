# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create the production build
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the static files from the build stage
COPY --from=builder /app/frontend/build /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
