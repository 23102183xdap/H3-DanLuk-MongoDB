module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: { type: String, required: true },
            // TODO Possibly make it look a little better.
            books: [ {
                book: {
                    type: mongoose.Schema.Types.ObjectID,
                    ref: "book",
                    required: [true, 'Remember book!']
                },
            }]
        },
    { timestamps: true }
    );

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const Category = mongoose.model("category", schema);
return Category;
};
