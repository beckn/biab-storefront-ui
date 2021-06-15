# build environment
FROM node:14.16.1-alpine as build
RUN apk update
RUN apk add nginx
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN yarn install
RUN yarn build

# production environment
FROM nginx:stable-alpine
RUN apk update && apk upgrade
RUN apk add --no-cache nodejs=14.16.1-r1 npm=14.16.1-r1
RUN npm install -g yarn
COPY --from=build /app /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 80 443
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]