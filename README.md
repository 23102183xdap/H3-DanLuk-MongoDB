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
> Models use Mongoose Schemas for Foreign Key use and setting relationships up between endpoints and schemas. Example below
```
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

### Controllers
> Controllers are using Mongoose function to create, read, update and delete entries into our MongoDB.