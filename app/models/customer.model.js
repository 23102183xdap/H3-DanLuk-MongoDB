module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            // TODO Add login system
            _id: String,
            firstname: String,
            lastname: String,
            birthdate: Date,
            // TODO loaned null after 30 days passed
            currentlyLoaned: [
                {
                    book: {
                        type: mongoose.Schema.Types.ObjectID,
                        ref: "book"
                    },
                    loanDate: { type: Date, default: null }
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
    const Customer = mongoose.model("customer", schema);
    return Customer;
};

