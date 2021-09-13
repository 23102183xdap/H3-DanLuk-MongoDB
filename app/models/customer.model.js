module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstname: String,
      lastname: String,
      birthdate: Date(),

      // TODO loaned default null
      // TODO loaned null after 30 days passed
      currentlyLoaned: {
        book: {
          type: mongoose.Schema.Types.ObjectID,
          ref: "book"
        },
        loanDate: Date()
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Customer = mongoose.model("customer", schema);
  return Customer;
};
