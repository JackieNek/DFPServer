module.exports = db =>{
  const Test = db.collection('test');

  return {
    list,
    create
  }

  function list() {
    
  }

  function create(testObj, callback) {
    Test.insertOne(testObj)
      .then((err, data) => callback(err, data));
  }
}