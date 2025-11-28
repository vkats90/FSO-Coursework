FROM node:20 AS base 

WORKDIR /usr/src/app

EXPOSE 3000

FROM base AS test

COPY . .

RUN npm ci --include=dev

RUN npm run test

FROM test AS prod

ENV VITE_BACKEND_URL=http://localhost:8080/api/

RUN npm run build


FROM nginx:1.25-alpine


COPY --from=prod /usr/src/app/dist /usr/share/nginx/html