module.exports = db => {
  require('./test')(db);
  require('./user')(db);
  require('./file')(db);
  require('./record')(db)
  require('./temporary-what')(db);
  require('./temporary-who')(db);
}