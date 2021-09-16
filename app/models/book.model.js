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
            },
            category: {
                type: mongoose.Schema.Types.ObjectID,
                ref: "category",
                required: [true, 'Remember category!']
            },
            publishDate: { type: Date, default: Date.UTC },
            series: { type: Number, default: null, required: false },
            coverLink: String,
            popularity: { type: Number, default: 0 }
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
