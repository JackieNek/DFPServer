module.exports = db => {
  test = require('./test')(db);
  return {
    test
  };
}