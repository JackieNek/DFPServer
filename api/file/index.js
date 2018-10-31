module.exports = (router, lib) => {
  const controller = require('./controller')(lib);
  const middleware = require('./middleware')(lib);
  
  router.get('/file', controller.list);

  router.post('/file',
    middleware.mergeFile,
    middleware.createFile,
    middleware.validateData,
    controller.createData);

  router.delete('/file/:id', controller.remove);

  router.put('/file/:id', controller.update);
};
