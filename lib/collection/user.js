const userCollection = {
    validator: {
        $jsonSchema: {
            required: ["id", "name", "role", "username", "password"],
            properties: {
                id: String,
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
}