module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const auth = require('../login/middlerware')(lib);

    router.get('/record',
        auth.checkLogin,
        controller.list);

    router.post('/record',
        auth.checkLogin,
        controller.create);

    router.delete('/record/:id',
        auth.checkLogin,
        controller.remove);

    router.put('/record/:id',
        auth.checkLogin,
        controller.update);
};
