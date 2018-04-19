FROM node:boron
WORKDIR /helloworld
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000