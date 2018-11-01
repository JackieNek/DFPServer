module.exports = lib => {
  return {
    createFile,
    mergeFile,
    validateData,
    canRemove,
    canUpdate
  };

  function createFile(req, res, next) {
    req.body.file.creator = req.user._id;    
    lib.file.create(req.body.file, (err, data) => {
      if(err) return res.status(500).json({
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
    if (req.body.data) req.data = req.body.data;
    next();
  }

  function validateData(req, res, next) {
    if (req.data) req.data.map(record => record.fileId = req.file._id);
    next();
  }

  function canRemove(req, res, next) {
    next();
  }

  function canUpdate(req, res, next) {
    next();
  }
};
