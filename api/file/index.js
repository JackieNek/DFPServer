module.exports = (router, lib) => {
  const controller = require('./controller')(lib);
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
    auth.checkLogin,
    controller.remove);

  router.put('/file/:id',
    auth.checkLogin,
    controller.update);
};
