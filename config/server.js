const app = require("./app");
const http = require('http');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type', "Accept-Language"]
};



const server = http.createServer(app);

server.listen(process.env.PORT || 8000, () => {
  console.log("Server is listening on port 8000");
});

module.exports = app;