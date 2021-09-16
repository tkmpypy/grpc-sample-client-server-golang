FROM node:15 as builder
WORKDIR /root
COPY *.json /root/
COPY .env.* /root/
COPY ./src /root/src/
COPY ./public /root/public/

ARG app_backend
ENV GATEWAY_BASE_URL=${app_backend}

RUN npm ci
RUN REACT_APP_GATEWAY_BASE_URL=${GATEWAY_BASE_URL} npm run build

FROM nginx:alpine
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /root/build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

