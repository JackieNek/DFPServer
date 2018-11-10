module.exports = (lib, io) => {
    return {
        list,
        create
    };

    function list(req, res) {
        res.status(200).json({test: 'ok'});
        io.emit("abc", {data: "data"});
    }

    function create(req, res) {
        lib.test.create(req.body.testObj, (err, data) => {
            if (err) res.status(500).json({
                err: {
                    code: 500,
                    message: 'Unable to create testObj document'
                }
            });
            res.status(200).json(data);
        });
    }
}