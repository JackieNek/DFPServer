module.exports = lib => {
  return {
    list,
    create,
    remove,
    update
  };

  function list(req, res) {    
    lib.record.list(req.query, (err, data) => {
      if (err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to list record'
        }
      });
      res.status(200).json(data);
    });
  }

  function create(req, res) {
    lib.record.create(req.body.record, (err, data) => {
      if (err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to create record document'
        }
      });
      res.status(200).json(data.ops[0]);
    });
  }

  function remove(req, res) {
    lib.record.remove(req.params.id, (err, data) => {
      if (err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to delete record document'
        }
      });
      res.status(204).end();
    });
  }

  function update(req, res) {
    lib.record.update(req.params.id, req.body.options, (err, data) => {
      if (err) res.status(500).json({
        err: {
          code: 500,
          message: 'Unable to update record document'
        }
      });
      res.status(200).json(data.value);
    });
  }
}