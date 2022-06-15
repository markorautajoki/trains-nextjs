FROM node:18-alpine

WORKDIR /opt/app

COPY . ./

RUN npm install && npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
