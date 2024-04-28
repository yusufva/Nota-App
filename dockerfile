FROM node:20.10.0-alpine AS build
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=2048"
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npx dotenv -e ./env/production.env -- npx prisma migrate deploy
RUN npm run build


FROM node:20.10.0-alpine AS server
WORKDIR /app
ENV NODE_OPTIONS="--max-old-space-size=2048"
COPY package* ./
COPY ./prisma ./prisma
COPY ./env/production.env ./env/production.env
RUN npm install --omit=dev
COPY --from=build ./app/dist ./dist
EXPOSE 8081
CMD [ "npm", "start" ]