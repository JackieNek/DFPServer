module.exports = lib => {
  return {
    createFile,
    mergeFile,
    validateData
  };

  function createFile(req, res, next) {
    lib.file.create(req.body.file, (err, data) => {
      if(err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to create file'
        }
      });
      req.file = data.ops[0];
      next();
    });
  }

  function mergeFile(req, res, next) {
    req.data = req.body.data;
    next();
  }

  function validateData(req, res, next) {
    req.data.map(record => record.fileId = req.file._id);
    next();
  }
};
