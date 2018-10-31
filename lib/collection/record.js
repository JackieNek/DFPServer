const recordCollection = {
  validator: {
    $jsonSchema: {
      required: ["speaker", "time", "content"],
      properties: {
        fileId: String,
        speaker: String,
        time: Number,
        content: String
      }
    }
  }
};

module.exports = db => {
  db.createCollection('record', recordCollection);
};
