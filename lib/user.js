module.exports = db =>{
    const USER = db.collection('user');

    return {
        createUser,
        retrieveUser,
        updateUser,
        deleteUser,
        retrieveUserById
    }

    function createUser() {

    }

    function retrieveUser(username, password, callback) {
        USER.findOne({username: username, password: password}, (err, user) => {
            callback(err, user)
        });
    }

    function retrieveUserById(id, callback) {
        USER.findOne({_id: new Object(id)}, (err, user) => {
            callback(err, user)
        })
    }

    function updateUser() {

    }

    function deleteUser() {

    }


}