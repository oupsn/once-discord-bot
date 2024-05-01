# Base image
FROM node

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Exposing server port
EXPOSE 1111

# Start the server using the production build
CMD [ "npm", "start" ]
