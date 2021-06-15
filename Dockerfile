FROM nginx

EXPOSE 80

COPY /dist /usr/share/nginx/html

ADD ./nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT nginx -g "daemon off;"