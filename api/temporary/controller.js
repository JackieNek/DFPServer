module.exports = (lib) => {
    return {
        getAll
    };

    function getAll(req, res) {
        const temp = {};
        lib.who.list({fileId: req.params.fileId}, (err, data) => {
            if (err) return send500Err(res, 'Unable to get data who from temporary');
            temp.temporary_who = data;
            
            lib.what.list({fileId: req.params.fileId}, (err, doc) => {
                if (err) return send500Err(res, 'Unable to get data what from temporary');
                temp.temporary_what = doc;                
                return res.status(200).json(temp)
            })
        })
    }
    
    function send500Err(res, message){
        return res.status(500).json({
            err: {
                "code": 500,
                "message": message
            }
        })
    }
}