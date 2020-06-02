FROM nginx:alpine
WORKDIR /Frontend
COPY . .
RUN npm install
