const app = require("./app");
const http = require('http');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type', "Accept-Language"]
};

// const socketIO = require('socket.io');
// const socketHandler = require("./socket")

const server = http.createServer(app);

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});

module.exports = app;