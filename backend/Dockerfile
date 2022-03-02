FROM node:16.13.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules:$PATH

ADD ./package.json /usr/src/app
RUN npm install
