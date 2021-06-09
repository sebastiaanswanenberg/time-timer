FROM node:alpine3.13

RUN mkdir /temp
WORKDIR /temp
COPY . /temp

RUN npm install && \
    npm install -g typescript
RUN npm run tsc

RUN mkdir -p /usr/src/app
RUN cp -R /temp/build/* /usr/src/app && \
    cp -R /temp/node_modules /usr/src/app
RUN rm -R /temp

WORKDIR /usr/src/app

EXPOSE 80
CMD ["node", "server.js"] 