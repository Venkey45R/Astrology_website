# Use a Node.js base image to build the React app
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the React app for production
# This command generates the 'build' folder
RUN npm run build

# --- Stage 2: Serve the static files with Nginx ---
FROM nginx:alpine

# Copy the build artifacts from the previous stage to Nginx's web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
