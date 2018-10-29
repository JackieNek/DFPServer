const express = require('express');
const router = express.Router();

module.exports = lib => {
  // đăng ký các api tại đây
  require('./test')(router, lib);
  return router
}
