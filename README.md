## Project setup
```
npm install
```

### Run
```
npx nodemon
```


### Routes
> Routes are located in app/routes if information is needed about them.

### Models
> Models use Mongoose Schemas for Foreign Key use and setting relationships up between schemas, so you can add a author to a book. Example below
Author Model
```js
module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      about: { type: String, default: null },
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
```
Book model
```js
const mongoose = require("mongoose")
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            title: String,
            pages: { type: Number, min: [1, 'Atleast one page'], required: true, },
            // FIXME Uncomment when needed, so the use of collection and category is working
            // category: {
            //     type: mongoose.Schema.Types.ObjectID,
            //     ref: "category",
            //     required: [true, 'Remember category!']
            // },
            // collection: {
            //     type: mongoose.Schema.Types.ObjectID,
            //     ref: "collection",
            //     required: [true, 'Remember collection!']
            // },
            author: [
                {
                    type: mongoose.Schema.Types.ObjectID,
                    ref: "author",
                    required: [true, 'Remember author!']
                },
            ],
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

```

### Controllers
> Controllers are using Mongoose function to create, read, update and delete entries into our MongoDB.