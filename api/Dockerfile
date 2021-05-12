FROM node:14

WORKDIR /groupamania/backend

COPY package.json ./

RUN npm install \
    && npm install --save nodemon \
    && npm install --save sequelize-cli

EXPOSE 8000

CMD npm start