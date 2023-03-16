# Specify a base image
FROM node:19-bullseye-slim

# Specify a working directory
WORKDIR /usr/src/app

RUN apt-get update \
 && apt-get install -y gcc git \
 && rm -rf /var/lib/apt/lists/*

# Copy the dependencies file
COPY ./package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy project dir
COPY ./ ./

# Launch app
CMD ["yarn", "start"]
