
module.exports = (application, lib, io) => {
  const api = require('../api')(lib, io);
  application.use('/api', api);
};