module.exports = (router, lib, io) => {
    const controller = require('./controller')(lib, io);
    const auth = require('../login/middlerware')(lib);
    const middleware = require('./middleware')(lib); 

    router.get('/record',
        auth.checkLogin,
        controller.list);

    router.post('/record/:fileID',
        auth.checkLogin,
        middleware.mergeRecord,
        controller.create);

    router.delete('/record/:id',
        auth.checkLogin,
        middleware.canRemove,
        controller.remove);

    router.put('/record/:id',
        auth.checkLogin,
        middleware.canUpdate,
        controller.update);

    router.post('/record/list-data/:fileID',
        auth.checkLogin,
        middleware.checkData,
        middleware.mergeData,
        controller.createMany)
};
