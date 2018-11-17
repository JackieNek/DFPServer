module.exports = db =>{
  const File = db.collection('file');
  const ObjectID = require('mongodb').ObjectID;

  return {
    list,
    create,
    remove,
    update,
    addHistory
  };

  function list(options, callback) {
    const query = {};
    if (options.fileId) {
      query._id = new ObjectID(options.fileId);
    }

    if (options.creator) {
      query.creator = new ObjectID(options.creator);
    }

    if (options.owner) {
      query.owners = {
        $elemMatch: {
          id : options.owner
        }
      };
    }

    File.find(query)
      .sort({ createAt: -1 })
      .toArray((err, data) => callback(err, data));
  }

  function create(file, callback) {
    File.insertOne(file, (err, data) => callback(err, data));
  }

  function remove(fileID, callback) {
    File.deleteOne({ _id: new ObjectID(fileID) }, (err, data) => callback(err, data));
  }

  function addHistory(fileID, his, callback) {
    const update = {
      $push :{ history: his}
    }
    
    File.findOneAndUpdate({ _id: new ObjectID(fileID) }, update, (err, data) => callback(err, data));
  }

  function update(author, fileID, options, callback) {
    const optionsUpdate = {};
    const pushHistory = {};
    
    if(options.name){
      optionsUpdate.name = options.name;
      pushHistory.history = {
        time: options.timeChange,
        message: `rename file to ${optionsUpdate.name}`,
        author: author
      }
    }
    
    if(options.owners){
      optionsUpdate.owners = options.owners;
    };

    File.findOneAndUpdate({ _id: new ObjectID(fileID) }, { $set: optionsUpdate, $push :pushHistory }, (err, data) => callback(err, data));
  }
}