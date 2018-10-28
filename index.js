const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const PORT = require('./constants').PORT;
const application = require("./config/app");

const server = http.createServer(application);
server.listen(PORT, () => {
  console.log('Server is running on port: '+ PORT);
});

require('./config/db')(MongoClient);