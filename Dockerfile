# Use a Node.js base image
FROM node:19.9.0

# Copy the rest of the application code to the working directory
COPY ./vite-project ./vite-project

WORKDIR "/vite-project"

# Install dependencies
RUN npm install

EXPOSE 3000

# Start the application
CMD npm run dev
