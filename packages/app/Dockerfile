FROM nginx:latest

LABEL maintainer="Frachtwerk GmbH"

ENV TZ=Europe/Berlin

COPY ./dist /usr/share/nginx/html
COPY ./etc/nginx.conf /etc/nginx/nginx.conf
COPY ./etc/default.conf /etc/nginx/conf.d/default.conf
