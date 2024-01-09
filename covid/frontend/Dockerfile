FROM node:20-buster-slim

WORKDIR /app
COPY . /app/
RUN npm install
EXPOSE 80
CMD ["npm", "run", "preview"]