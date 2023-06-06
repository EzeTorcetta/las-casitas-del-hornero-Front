
# Use a Node.js base image
FROM node:14


# Copy the rest of the application code to the working directory
COPY ./vite-project ./vite-project

WORKDIR "/vite-project"

# Install dependencies
RUN npm install

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
RUN npm run dev
