
module.exports = (application, lib) => {
  const api = require('../api')(lib);
  application.use('/api', api);
};