# BUILD STEP
FROM node:lts-alpine3.12 as react_build 
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . ./
ENV REACT_APP_BACKEND_BASE_URL https://4wncfp35ie.execute-api.ap-south-1.amazonaws.com/beta/api/v1.0/tweets/
RUN npm run build 

# DEPLOY/RUN STAGE
FROM nginx:1.19-alpine
COPY --from=react_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80