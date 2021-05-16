# BUILD STEP
FROM node:lts-alpine3.12 as react_build 
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./
ARG REACT_APP_BACKEND_BASE_URL
ENV REACT_APP_BACKEND_BASE_URL $REACT_APP_BACKEND_BASE_URL
ARG REACT_APP_WS_CONNECT_URL
ENV REACT_APP_WS_CONNECT_URL $REACT_APP_WS_CONNECT_URL
ARG REACT_APP_WS_TWEETS_SUB_EP
ENV REACT_APP_WS_TWEETS_SUB_EP $REACT_APP_WS_TWEETS_SUB_EP
RUN npm run build 

# DEPLOY/RUN STAGE
FROM nginx:1.19-alpine
COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80