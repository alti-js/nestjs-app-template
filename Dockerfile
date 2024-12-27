FROM node:20 as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV APP_ENV=docker

FROM base as api
ENV PORT=8080
EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]

FROM base as data
ENV PORT=80
EXPOSE 80
CMD [ "npm", "run", "start:data:prod" ]