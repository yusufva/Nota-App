FROM node:20.10.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx dotenv -e ./env/production.env -- npx prisma migrate deploy
RUN npm run build


FROM node:20.10.0-alpine AS server
WORKDIR /app
COPY package* ./
COPY ./prisma ./prisma
COPY ./env/production.env ./env/production.env
RUN npm install --production
COPY --from=build ./app/dist ./dist
EXPOSE 8081
CMD [ "npm", "start" ]