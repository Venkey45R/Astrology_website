FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install -g serve && npm install

COPY . .
RUN npm run build

EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]
