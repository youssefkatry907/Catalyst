const app = require("./app");
const http = require('http');

const server = http.createServer(app);


server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

module.exports = app;