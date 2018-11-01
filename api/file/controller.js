module.exports = lib => {
    return {
        list,
        createData,
        update,
        remove
    };

    function list(req, res) {
        lib.file.list(req.query, (err, data) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: 'Unable to list file'
                });
            } else {
                res.status(200).json(data);
            }
        });
    }

    function createData(req, res) {
        if (!req.data) res.status(200).json(req.file);
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