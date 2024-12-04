FROM node:20.14.0 as build

WORKDIR /tmp/react

COPY . .

RUN npm install

RUN npm run build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

WORKDIR /solomanager

RUN rm -rf /tmp/react



FROM node:20.14.0

WORKDIR /solomanager