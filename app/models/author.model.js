module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstname: { type: string, required: true },
      lastname: { type: string, required: true },
      about: { type: string, default: null },
      popularity: { type: Number, default: 0 }
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
