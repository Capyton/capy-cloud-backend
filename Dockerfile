# Specify a base image
FROM node:18.4.0-buster-slim

# Specify a working directory
WORKDIR /usr/src/app

RUN apt-get update \
 && apt-get install -y gcc git

# Copy the dependencies file
COPY ./package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy project dir
COPY ./ ./

# Launch app
CMD ["yarn", "start"]
