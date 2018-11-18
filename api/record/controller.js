module.exports = (lib, io) => {
    return {
        list,
        create,
        remove,
        update,
        createMany
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
         
            lib.file.addHistory(record.fileId, {
                time: req.body.timeChange,
                message: `create record ${record.speaker} ${record.time} ${record.content}`,
                author: req.user.name
            }, (err, data) => {
                io.emit("stream_file", dataEmit);
                return res.status(201).json(record);
            })
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

            var options = req.body.options
            var data1 = data.value

            if (options.speaker) {
                data1.speaker= options.speaker;
            };
        
            if (options.time||options.time===0) {
                data1.time = options.time;
            };
        
            if (options.content) {
                data1.content = options.content;
            };
            
            let record = data1;
            let userEmit = req.user;
            delete userEmit.password;
            delete userEmit.username;
            let dataEmit = {user: userEmit, record : record};

            lib.file.addHistory(record.fileId, {
                time: req.body.timeChange,
                message: `update record to ${record.speaker} ${record.time} ${record.content}`,
                author: req.user.name
            }, (err, data) => {
                io.emit("edit_record", dataEmit);
                return res.status(200).json(data1);
            }) 
        });
    }

    function createMany (req, res) {
        lib.record.createMany(req.dataArray, (err, data) => {
            if (err) return res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to create many record document'
                }
            });
            lib.file.addHistory(req.params.fileID, {
                time: req.body.time,
                message: "create many record",
                author: req.user.name
            }, (err, docs) => {
                io.emit("create_many_record", data.ops)
                return res.status(200).json(data.ops)
            })
        });
    }
}