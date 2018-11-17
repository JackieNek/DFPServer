const recordCollection = {
  validator: {
    $jsonSchema: {
      required: ["speaker", "time", "content"],
      properties: {
        fileId: String,
        speaker: String,
        time: Number,
        content: String,
        userOn : Array
      }
    }
  }
};

module.exports = db => {
  db.createCollection('record', recordCollection);
};
