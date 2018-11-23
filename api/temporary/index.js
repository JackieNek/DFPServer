module.exports = (router, lib, io) => {
    const auth = require('../login/middlerware')(lib);
    const controller = require('./controller')(lib);

    router.get('/temporary/:fileId',
        auth.checkLogin,
        controller.getAll)
}