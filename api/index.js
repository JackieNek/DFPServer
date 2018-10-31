const express = require('express');
const router = express.Router();

module.exports = lib => {
  // đăng ký các api tại đây
  require('./test')(router, lib);
  require('./login')(router, lib);
  require('./record')(router, lib);
  require('./file')(router, lib)

  return router
}
