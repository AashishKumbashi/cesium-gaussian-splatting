# Use the official Node.js 18 Alpine image as a base
FROM node:18-alpine

# Install Git for cloning the repository
RUN apk add --no-cache git

# Set the working directory inside the container
WORKDIR /app

# Clone the Git repository (replace <repo-url> with your repository URL)
RUN git clone https://github.com/AashishKumbashi/cesium-gaussian-splatting .

# Install dependencies
RUN npm install

# Expose the development server port (default for Vite is 5173)
EXPOSE 3001

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
