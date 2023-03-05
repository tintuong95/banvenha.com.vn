FROM node:17-alpine3.12

EXPOSE 8000 9929 9230

WORKDIR /build

RUN npm install -g gatsby-cli

COPY package*.json ./

COPY . .

RUN npm install

CMD ["gatsby", "develop", "-H", "0.0.0.0" ]