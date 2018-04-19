FROM node:boron
RUN mkdir /helloworld
COPY . /helloworld
WORKDIR /helloworld
RUN npm start
EXPOSE 3000