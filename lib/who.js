module.exports = db => {
    const ObjectID = require('mongodb').ObjectID;
    const Who = db.collection('temporary_who');

    return {
        createMany,
        list,
        updateMany
    }

    function createMany(dataWho, callback) {
        dataWho.map(data => data.merge = false);
        Who.insertMany(dataWho, (err, datas) => callback(err, datas));
    }

    function list(options, callback) {
        const query = {};
                
        if (options._id) query._id = new ObjectID(options._id);
        if (options.fileId) query.fileId = new ObjectID(options.fileId);
        if ( typeof options.merge !== 'undefined') query.merge = options.merge;

        Who.find(query)
            .sort({time: 1, afr: 1})
            .toArray((err, data) => callback(err, data));
    }

    function updateMany(options, callback) {
        Who.updateMany({_id: {$in: options.filter}}, {$set: {merge: options.merge}}, (err, data) => callback(err, data))
    }
}