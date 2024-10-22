FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV TYPEORM_HOST=db
ENV TYPEORM_PORT=5432
ENV TYPEORM_USERNAME=postgres
ENV TYPEORM_PASSWORD=postgres
ENV TYPEORM_DATABASE=my_kanboard

EXPOSE 3000

CMD ["npm", "run", "start:prod"]