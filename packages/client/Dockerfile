FROM node:14

RUN npm install -g http-server

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build || true

EXPOSE 8080
CMD [ "http-server", "dist" ]
