# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["run", "npm start" ]