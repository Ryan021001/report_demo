# Stage 1: Build stage
FROM node:18 as builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build it
COPY . .
RUN npm run build

# Stage 2: Production stage
FROM node:18-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy only the built files from the previous stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Copy the .env file
COPY .env ./

# Install only production dependencies
RUN npm install --only=production

# Expose port and start the application
CMD ["node", "dist/main.js"]
