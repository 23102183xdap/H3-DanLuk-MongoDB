module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            email: String,
            address: String,
            books: [
                {
                    book: {
                        type: mongoose.Schema.Types.ObjectID,
                        ref: "book",
                    }
                }
            ]
        },
        { timestamps: true }
    );
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Publisher = mongoose.model("publisher", schema);
    return Publisher;
};

