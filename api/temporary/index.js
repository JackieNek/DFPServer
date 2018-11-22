module.exports = (router, lib, io) => {
    const auth = require('../login/middlerware')(lib);
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')(lib, io);

    router.get('/temporary/:fileId',
        auth.checkLogin,
        controller.getAll)
}