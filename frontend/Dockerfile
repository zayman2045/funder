# Build stage
FROM node:21-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build

# Run stage
FROM node:21-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD [ "npm", "start" ]