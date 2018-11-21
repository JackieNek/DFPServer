module.exports = db => {
    const ObjectID = require('mongodb').ObjectID;
    const What = db.collection('temporary_what');

    return {
        createMany,
        list,
        updateMany
    }

    function createMany(dataWhat, callback) {
        dataWhat.map(data => data.merge = false);
        What.insertMany(dataWhat, (err, datas) => callback(err, datas));
    }

    function list(options, callback) {
        const query = {};

        if (options._id) query._id = new ObjectID(options._id);
        if (options.fileId) query.fileId = new ObjectID(options.fileId);
        if (options.merge) query.merge = options.merge;

        What.find(query)
            .sort({time: 1, afr: 1})
            .toArray((err, data) => callback(err, data));
    }

    function updateMany(options, callback) {
        What.updateMany({_id: {$in: options.filter}}, {$set: {merge: options.merge}}, (err, data) => callback(err, data))
    }
}