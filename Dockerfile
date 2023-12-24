FROM node:18-alpine
USER root

# Refresh remote packages
RUN apk update

# Install Bash
RUN apk add bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# Install curl
RUN apk --no-cache add curl

# Install Python
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
#RUN python3 -m ensurepip
#RUN pip3 install --no-cache --upgrade pip setuptools

# Install make, g++ (for bcrypt)
RUN apk add --no-cache make build-base
RUN mkdir /app

# Install parcel
RUN npm i parcel-bundler -g

# Install mongodb
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories
RUN apk update
RUN apk add mongodb=3.4.4-r0
RUN mkdir -p /data/db/
RUN chown root /data/db

# Install Declare
COPY . /app/
RUN export NODE_TLS_REJECT_UNAUTHORIZED=0 && cd /app && npm i && sh /app/scripts/build.sh

# Export
VOLUME ["/data/db"]
EXPOSE 3000
CMD mongod --bind_ip 0.0.0.0 & sleep 10 && node /app/server/dist/index.js
