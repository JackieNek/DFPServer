const userCollection = {
    validator: {
        $jsonSchema: {
            required: ["id", "name", "role", "username", "password"],
            properties: {
                name: String,
                role: Number,
                username: String,
                password: String
            }
        }
    }
};

module.exports = (db) => {
    db.createCollection('user', userCollection);
    db.collection('user').createIndex({ username: 1 });

}