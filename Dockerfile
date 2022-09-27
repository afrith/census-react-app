FROM node:16
ENV NODE_ENV production
WORKDIR /home/node
COPY package.json package-lock.json /home/node/
RUN npm ci
COPY build /home/node/build
EXPOSE 3000
USER node
CMD [ "npm", "start" ]
