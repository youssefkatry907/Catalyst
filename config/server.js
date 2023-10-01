const app = require("./app");
const http = require('http');


const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = server;