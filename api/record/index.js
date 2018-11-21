module.exports = (router, lib, io) => {
    const controller = require('./controller')(lib, io);
    const auth = require('../login/middlerware')(lib);
    const middleware = require('./middleware')(lib);
    const temporary = require('../temporary/middleware')(lib, io)

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
        temporary.addDataWhoToTemporary,
        temporary.addDataWhatToTemporary,
        temporary.getDataWhoFromTemporary,
        temporary.getDataWhatFromTemporary,
        middleware.mergeData,
        temporary.updateDataWhoToTemporary,
        temporary.updateDataWhatToTemporary,
        controller.createMany)
};
