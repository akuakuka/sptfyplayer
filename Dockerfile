FROM node:alpine
WORKDIR ./src
COPY ./ ./
RUN npm i
EXPOSE 3001
CMD ["npm", "run", "frontend"]