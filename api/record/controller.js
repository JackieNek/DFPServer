module.exports = (lib, io) => {
    return {
        list,
        create,
        remove,
        update
    };

    function list(req, res) {
        lib.record.list(req.query, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to list record'
                }
            });
            return res.status(200).json(data);
        });
    }

    function create(req, res) {
        lib.record.create(req.record, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to create record document'
                }
            });
            let record = data.ops[0];
            let dataEmit = {userId: req.user._id, record : record};
            io.emit("stream_file", dataEmit);
            return res.status(201).json(data.ops[0]);
        });
    }

    function remove(req, res) {
        lib.record.remove(req.params.id, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to delete record document'
                }
            });
            io.emit("delete_record", {id: req.params.id});
            return res.status(204).end();
        });
    }

    function update(req, res) {
        lib.record.update(req.params.id, req.body.options, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to update record document'
                }
            });
            let record = req.body.options;
            record["_id"] = req.params.id;
            let dataEmit = {userId: req.user._id, record : record};
            io.emit("edit_record", dataEmit);
            return res.status(200).json(data.value);
        });
    }
}