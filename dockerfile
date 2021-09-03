# build environment
#syntax=docker/dockerfile:1.2
FROM node:14.17.6-alpine as build
RUN --mount=type=secret,id=MAPS_API_KEY
ENV MAPS_KEY=$MAPS_API_KEY
RUN echo $MAPS_KEY
RUN echo $MAPS_API_KEY
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
RUN apk add --no-cache nodejs=14.17.6-r0 npm=14.17.6-r0
RUN npm install -g yarn
COPY --from=build /app /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 8080
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
