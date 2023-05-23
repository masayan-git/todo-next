# Define the base image
FROM node:18.16.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "dev"]
