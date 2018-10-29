const testCollection = {
  validator: {
    $jsonSchema: {
      required: ["name"],
      properties: {
        name: String
      }
    }
  }
};

module.exports = (db) => {
  db.createCollection('test', testCollection);
}