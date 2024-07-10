FROM node:18

# Create app directory
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/.tmp/sass && chmod -R 777 /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .
ENV NODE_ENV='development' \
  PASSWORD='we'
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
