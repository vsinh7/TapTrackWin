# Use official Node.js image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining source code
COPY . .

# Expose the port your server uses (adjust if needed)
EXPOSE 3001

# Command to run your app
CMD ["node", "server.js"]
