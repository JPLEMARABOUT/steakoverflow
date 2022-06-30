FROM node:16

WORKDIR ./app

COPY package*.json ./

RUN npm install

COPY . .

ENV environement="docker"
ENV USER_TOKEN_KEY="sauce_tatare"
ENV REFRESH_TOKEN_KEY="palendrome_symétrique"

EXPOSE 8081
CMD [ "npm", "run", "start_user" ]