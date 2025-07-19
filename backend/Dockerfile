FROM node:18
WORKDIR /app
COPY package.json tsconfig.json .npmrc* ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
