const express = require('express');
const router = express.Router();

module.exports = (lib, io) => {
    // đăng ký các api tại đây
    require('./test')(router, lib, io);
    require('./login')(router, lib);
    require('./record')(router, lib, io);
    require('./file')(router, lib, io);
    require('./user')(router, lib);
    require('./socket')(io, lib);
    return router
}
