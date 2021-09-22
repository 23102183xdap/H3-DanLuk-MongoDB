module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      about: { type: String, default: null },
      //popularity: { type: Number, default: 0 }, // TODO Make it work at some point
      books: [{
        book: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "book"
        }
      }]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Author = mongoose.model("author", schema);
  return Author;
};
