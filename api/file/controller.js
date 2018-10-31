module.exports = lib => {
  return {
    list,
    createData,
    update,
    remove
  };

  function list(req, res) {
    lib.file.list(req.query, (err, data) => {
      if (err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to list file'
        }
      });
      res.status(200).json(data);
    });
  }

  function createData(req, res) {
    lib.record.createMany(req.data, (err, data) => {
      if (err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to create data file'
        }
      });
      res.status(200).json(req.file);
    });
  }

  function update(req, res) {
    lib.file.update(req.params.id, req.body.options, (err, data) => {
      if (err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to create data file'
        }
      });
      res.status(200).json(data.value);
    })
  }

  function remove(req, res) {
    
  }
}