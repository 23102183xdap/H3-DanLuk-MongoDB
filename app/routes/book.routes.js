module.exports = app => {
    const book = require("../controllers/book.controller");

    var router = require("express").Router();

    // Create a new Author
    router.post("/create", book.create);

    // Retrieve all Authors
    router.get("/", book.findAll);

    // Retrieve a single Author with id
    router.get("/author/id/:id", book.findOneById);

    router.get("/author/title/:title", book.findByTitle);

    // Update a Author with id
    router.put("/update/:id", book.update);

    // Delete a Author with id
    router.delete("/delete/:id", book.delete);

    // Create a new Author
    router.delete("/", book.deleteAll);

    app.use("/api/books", router);
};
