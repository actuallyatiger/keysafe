FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production=true
COPY . ./
RUN npm run build
EXPOSE 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
CMD ["npm", "start"]
