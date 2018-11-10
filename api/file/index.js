module.exports = (router, lib, io) => {
  const controller = require('./controller')(lib, io);
  const middleware = require('./middleware')(lib);
  const auth = require('../login/middlerware')(lib)
  
  router.get('/file',
    auth.checkLogin,
    controller.list);

  router.post('/file',
    auth.checkLogin,
    middleware.mergeFile,
    middleware.createFile,
    middleware.validateData,
    controller.createData);

  router.delete('/file/:id',
    // auth.checkLogin,
    middleware.canRemove,
    controller.remove);

  router.put('/file/:id',
    auth.checkLogin,
    middleware.canUpdate,
    controller.update);
};
