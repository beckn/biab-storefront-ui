#!/bin/sh
cd /usr/share/nginx/html
yarn start
nginx -g daemon off;
