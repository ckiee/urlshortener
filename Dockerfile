FROM node:11


WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

COPY . .

# We have to run yarn after copying because tsc needs to build with the 'install' script
RUN yarn

EXPOSE 3000
CMD [ "yarn", "built" ]