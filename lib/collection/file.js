const fileCollection = {
  validator: {
    $jsonSchema: {
      required: ["name", 'creator'],
      properties: {
        name: String,
        creator: String,
        owners: Array,
        createAt: Number,
        history: Array
      }
    }
  }
};

module.exports = db => {
  db.createCollection('file', fileCollection);
  db.collection('file').createIndex({ name: 1 , creator: 1 });
};
