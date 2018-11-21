const whoCollection = {
    validator: {
        $jsonSchema: {
            required: ["time", "speaker", "afr", "fileId", "merge"],
            properties: {
                time: Number,
                speaker: String,
                afr: String,
                fileId: String,
                merge: Boolean
            }
        }
    }
};

module.exports = db => {
    db.createCollection('temporary_who', whoCollection);
};