module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            
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

