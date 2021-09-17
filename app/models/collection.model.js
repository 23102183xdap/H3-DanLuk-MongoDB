module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            bestSeller: {type: Boolean, default: false },
            newReleases: {type: Boolean, default: false },
            popularAuthors: {type: Boolean, default: false },
            book: {
                type: mongoose.Schema.Types.ObjectID,
                ref: "book",
                required: [true, 'Remember book!']
            },
        },
    { timestamps: true }
    );

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const Collection = mongoose.model("collection", schema);
return Collection;
};
