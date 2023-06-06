# Use a Node.js base image
FROM node:14

# Copy the rest of the application code to the working directory
COPY ./vite-project ./vite-project

WORKDIR "/vite-project"

# Install dependencies
RUN npm install

# Start the application
CMD npm start 
