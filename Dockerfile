FROM --platform=linux/amd64 node:19.9-alpine as build
EXPOSE 3000
WORKDIR /app
RUN rm -rf node_modules
COPY . /app
RUN npm ci
CMD ["npm", "start"]
