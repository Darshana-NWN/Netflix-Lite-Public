# --- Build Stage ---
# Start with a Node.js image to build our React app
FROM node:16 as builder

# Set the working directory
WORKDIR /app

# Copy the package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the production-ready static files
RUN npm run build

# --- Production Stage ---
# Now, start with a fresh, lightweight web server image
FROM nginx:stable-alpine

# Copy the built static files from the 'builder' stage
# into the directory Nginx serves files from.
COPY --from=builder /app/build /usr/share/nginx/html

# Tell Docker that the container will listen on port 80
EXPOSE 80

# The command to start the Nginx server (this is the default)
CMD ["nginx", "-g", "daemon off;"]