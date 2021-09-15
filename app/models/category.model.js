module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            isFiction: { type: Boolean, required: true },

            kids: { type: Boolean, default: null, },
            teen: { type: Boolean, default: null },
            youngAdult: { type: Boolean, default: null },
            crime: { type: Boolean, default: null },
            fantasy: { type: Boolean, default: null },
            literaryFiction: { type: Boolean, default: null },
            romance: { type: Boolean, default: null },
            scifi: { type: Boolean, default: null },
            suspence: { type: Boolean, default: null },
            thriller: { type: Boolean, default: null },
            horror: { type: Boolean, default: null },
            mystery: { type: Boolean, default: null },
            religion: { type: Boolean, default: null },
            basedOnATrueStory: { type: Boolean, default: null },
            art: { type: Boolean, default: null },
            biography: { type: Boolean, default: null },
            education: { type: Boolean, default: null },
            music: { type: Boolean, default: null },
            pets: { type: Boolean, default: null },
            poetry: { type: Boolean, default: null },
            science: { type: Boolean, default: null },
            selfImprovement: { type: Boolean, default: null },
            art: { type: Boolean, default: null },
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
