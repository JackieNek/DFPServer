module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const loginMiddleware = require('./../login/middlerware');

    router.get('/record', controller.list);

    router.post('/record', controller.create);

    router.delete('/record/:id', controller.remove);

    router.put('/record/:id', controller.update);
};
