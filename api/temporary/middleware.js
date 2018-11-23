module.exports = (lib, io) => {
    return {
        addDataWhoToTemporary,
        addDataWhatToTemporary,
        getDataWhoFromTemporary,
        getDataWhatFromTemporary,
        updateDataWhoToTemporary,
        updateDataWhatToTemporary
    }

    function addDataWhoToTemporary(req, res, next) {
        if (req.dataWho) {
            lib.who.createMany(req.dataWho, (err, data) => {                
                if (err) return send500Err(res, 'Unable to add data who to temporary');
                    io.emit("tempory_who", req.body.dataArray1);
                next();
            });
        } else {
            next();
        };
    }

    function addDataWhatToTemporary(req, res, next) {
        if (req.dataWhat) {
            lib.what.createMany(req.dataWhat, (err, data) => {
                if (err) return send500Err(res, 'Unable to add data what to temporary');
                    io.emit("tempory_what", req.body.dataArray2);
                    next();
            });
        } else {
            next();
        };
    }

    function getDataWhoFromTemporary(req, res, next) {
        const options = {
            fileId: req.params.fileID,
            merge: false
        };

        lib.who.list(options, (err, data) => {
            if (err) return send500Err(res, 'Unable to get data who from temporary');
            req.dataArray1 = data;
            next();
        })
    }

    function getDataWhatFromTemporary(req, res, next) {
        const options = {
            fileId: req.params.fileID,
            merge: false
        };

        lib.what.list(options, (err, data) => {
            if (err) return send500Err(res, 'Unable to get data who from temporary');
            req.dataArray2 = data;
            next();
        });
    }

    function updateDataWhoToTemporary(req, res, next) {        
        const options = {
            filter: [],
            merge: true
        };

        if(req.data){
            req.data.dataWhoNeedUpdate.map(data => options.filter.push(data._id));
            lib.who.updateMany(options, (err, data) => {
                if (err) return send500Err(res, 'Unable to set merge = true from who temporary');
                next();
            });
        } else {
            next();
        };
    }

    function updateDataWhatToTemporary(req, res, next) {
        const options = {
            filter: [],
            merge: true
        };

        if(req.data){
            req.data.dataWhatNeedUpdate.map(data => options.filter.push(data._id));
            lib.what.updateMany(options, (err, data) => {
                if (err) return send500Err(res, 'Unable to set merge = true from what temporary');
                next();
            });
        } else {
            next();
        }
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