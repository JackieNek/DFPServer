const whatCollection = {
    validator: {
        $jsonSchema: {
            required: ["time", "content", "afr", "fileId"],
            properties: {
                time: Number,
                content: String,
                afr: String,
                fileId: String,
                merge: Boolean
            }
        }
    }
};

module.exports = db => {
    db.createCollection('temporary_what', whatCollection);
};