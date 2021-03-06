module.exports = (lib, io) => {
    return {
        list,
        createData,
        update,
        remove,
        getHistory
    };

    function list(req, res) {
        lib.file.list(req.query, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to list file'
                }
            });
            return res.status(200).json(data);
        });
    }

    function createData(req, res) {
        if (!req.data) return res.status(200).json(req.file);
        lib.record.createMany(req.data, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to create data file'
                }
            });
            return res.status(201).json(req.file);
        });
    }

    function update(req, res) {
        const author = req.user.name;
        const options = req.body.options;
        const id = req.params.id;
        options.timeChange = req.body.timeChange;
        lib.file.update(author, id, options, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to update file'
                }
            });
            lib.file.list({ fileId: id }, (err, data) => {
                return res.status(200).json(data);
            })
        })
    }

    function remove(req, res) {
        lib.file.remove(req.fileID, (err) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to delete file'
                }
            });
            io.emit("delete_file", {id:req.fileID});
            return res.status(204).end();
        });
    }

    function getHistory(req, res) {
        lib.file.list({ fileId: req.params.id }, (err, data) => {            
            return res.status(200).json(data[0].history);
        })
    }
}