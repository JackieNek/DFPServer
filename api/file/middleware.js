module.exports = lib => {
  return {
    createFile,
    mergeFile,
    validateData,
    canRemove,
    canUpdate
  };

  function createFile(req, res, next) {
    const file = {
      creator: req.user._id,
      name: req.body.name,
      owners: req.body.owners,
      createAt: req.body.createAt,
      date: req.body.date,
      description: req.body.description,
      history: [{
        time: req.body.createAt,
        message: `Create new file ${req.body.name}`,
        author: req.user.name
      }]
    };

    lib.file.create(file, (err, data) => {
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
    const options = {
      fileId: req.params.id,
      creator: req.user._id
    }

    lib.file.list(options, (err, data) => {
      if (!data) return res.status(401).json({
        err: {
          code: 401,
          message: 'Access deniced to delete file'
        }
      });
      req.fileID = req.params.id
      next();
    })
  }

  function canUpdate(req, res, next) {
    next();
  }
};
