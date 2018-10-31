module.exports = db =>{
  const File = db.collection('file');
  const ObjectID = require('mongodb').ObjectID;

  return {
    list,
    create,
    remove,
    update
  };

  function list(options, callback) {
    const query = {};
    if (options.creator) {
      query.creator = options.creator;
    }

    if (options.owner) {
      query.owners = options.owner;
    }

    File.find(query)
      .sort({ name: 1 })
      .toArray((err, data) => callback(err, data));
  }

  function create(file, callback) {
    File.insertOne(file, (err, data) => callback(err, data));
  }

  function remove() {

  }

  function update(fileID, options, callback) {
    const optionsUpdate = {};

    if(options.name){
      optionsUpdate.name = options.name;
    };

    if(options.owners){
      optionsUpdate.owners = options.owners;
    };

    File.findOneAndUpdate({ _id: new ObjectID(fileID) }, { $set: optionsUpdate }, (err, data) => callback(err, data));
  }
}