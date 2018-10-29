const URL = require('../constants').URL;
const dbName = require('../constants').DB_NAME;
const MongoClient = require('mongodb').MongoClient;
let callback, db;

MongoClient.connect(URL, {useNewUrlParser: true}, function(err, client) {
  if (err) throw err;
  console.log("Database connected!");
  db = client.db(dbName);
  callback(db);
});

module.exports = function(cb){
  if(typeof db != 'undefined') {
    cb(db)
  }else{
    callback = cb
  }
}