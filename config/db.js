const URL = require('../constants').URL;

module.exports = (MongoClient) => {
  MongoClient.connect(URL, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
  });
};