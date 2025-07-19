FROM node:18
WORKDIR /app
COPY package.json tsconfig.json vite.config.ts index.html .
RUN npm install
COPY src ./src
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host"]
