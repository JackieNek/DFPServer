module.exports = db => {
  require('./test')(db);
  require('./user')(db);
}