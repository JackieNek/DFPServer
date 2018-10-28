const api = require('../api');

module.exports = application => {
  application.use('/api', api);
};