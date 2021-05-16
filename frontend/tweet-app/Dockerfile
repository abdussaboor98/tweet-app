FROM node:12.2.0-alpine as react_build 
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent 
COPY . ./
RUN npm run build 

FROM nginx:1.16.0-alpine
COPY --from=react_build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80 
# CMD ["nginx","-g","daemon off;"]