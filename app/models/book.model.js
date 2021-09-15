const mongoose = require("mongoose")
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            pages: { type: Number, min: [1, 'Atleast one page'], required: true, },
            author: {
                type: mongoose.Schema.Types.ObjectID,
                ref: "author",
                required: [true, 'Remember author!']
            }, // TODO Add Author Foreign key
            publishDate: { type: Date, default: Date.UTC },
            series: { type: Number, default: null, required: false },
            coverLink: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Book = mongoose.model("book", schema);
    return Book;
};
