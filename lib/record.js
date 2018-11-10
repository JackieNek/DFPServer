module.exports = db => {
  const Record = db.collection('record');
  const ObjectID = require('mongodb').ObjectID;

  return {
    list,
    create,
    createMany,
    remove,
    removeMany,
    update
  }

  function list(options, callback) {
    const query = {}; 
    if (options.recordID) {
      query._id = new ObjectID(options.recordID);
    };

    if (options.fileId) {
      query.fileId = new ObjectID(options.fileId);
    };

    if (options.speaker) {
      query.speaker = options.speaker
    };
    
    Record.find(query)
      .sort({ time: 1 })
      .toArray((err, data) => callback(err, data));
  }

  function create(record, callback) {
    Record.insertOne(record, (err, data) => callback(err, data));
  }

  function createMany(records, callback) {
    Record.insertMany(records, (err, datas) => callback(err, datas));
  }

  function remove(recordID , callback) {
    Record.deleteOne({ _id: new ObjectID(recordID) }, (err, data) => callback(err, data));
  }

  function update(recordID, options, callback) {
    const optionsUpdate = {};

    if (options.speaker) {
      optionsUpdate.speaker = options.speaker;
    };

    if (options.time||options.time===0) {
      optionsUpdate.time = options.time;
    };

    if (options.content) {
      optionsUpdate.content = options.content;
    };

    Record.findOneAndUpdate({ _id: new ObjectID(recordID) }, {$set: optionsUpdate}, (err, data) => callback(err, data));
  }

  function removeMany(fileID) {
    Record.deleteMany({ fileId: new ObjectID(fileID) }, (err) => callback(err));
  }
}