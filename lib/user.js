module.exports = db =>{
    const USER = db.collection('user');
    const ObjectID = require('mongodb').ObjectID;

    return {
        createUser,
        retrieveUser,
        updateUser,
        deleteUser,
        retrieveUserById,
        getAllUser,
        retrieveUserByUsername
    }

    function createUser(user, callback) {
        USER.insertOne(user, (err, data) => callback(err, data));
    }

    function retrieveUserByUsername(username, callback) {
        USER.findOne({username: username}, (err, user) => {
            callback(err, user)
        });
    }

    function retrieveUser(username, password, callback) {
        USER.findOne({username: username, password: password}, (err, user) => {
            callback(err, user)
        });
    }

    function retrieveUserById(id, callback) {
        USER.findOne({_id: new ObjectID(id)}, (err, user) => {
            callback(err, user)
        })
    }

    function updateUser() {

    }

    function deleteUser() {

    }

    function getAllUser(callback) {
        USER.find({}).toArray((err, result) => {
            callback(err, result);
        })
    }


}