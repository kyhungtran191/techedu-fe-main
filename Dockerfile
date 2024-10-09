FROM node:22.9.0-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --no-cache --frozen-lockfile
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn build

FROM nginx:alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
