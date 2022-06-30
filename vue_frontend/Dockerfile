FROM node:16

WORKDIR ./app

COPY package*.json ./

RUN npm install --force

COPY . .

ENV environement="docker"

EXPOSE 8079
CMD [ "npm", "run", "serve" ]