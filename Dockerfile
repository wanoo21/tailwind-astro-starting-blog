FROM --platform=linux/amd64 node:19.9-alpine as build
EXPOSE 3000
WORKDIR /app
COPY . /app
CMD ["npm", "start"]