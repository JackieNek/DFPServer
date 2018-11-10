const http = require('http');
const PORT = require('./constants').PORT;
const mongo = require('./config/db')
let server;

mongo(db => {
  registCollection(db)

  const lib = require('./lib')(db);
  const application = require("./config/app")(lib);
  server = http.createServer(application);
  start(db);
});

function registCollection(db) {
  require('./lib/collection')(db);
}

function start() {
  server.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on port: '+ PORT);
  });
}