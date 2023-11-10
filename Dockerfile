FROM node:18-alpine

WORKDIR /project

COPY . .

RUN npm install

EXPOSE 4321

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
