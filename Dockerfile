FROM node:10
COPY package.json ./
COPY server.js ./
COPY cardsRoute.js ./
COPY db.js ./
COPY config.json ./
RUN npm install
EXPOSE 5000
CMD node ./server.js
