module.exports = app => {
    const book = require("../controllers/book.controller");

    var router = require("express").Router();

    // Create a new Book
    router.post("/create", book.create);

    // Retrieve all Book
    router.get("/", book.findAll);

    // Retrieve a single Book with id
    router.get("/book/id/:id", book.findOneById);

    router.get("/book/title/:title", book.findByTitle);

    // Update a Book with id
    router.put("/update/:id", book.update);

    // Delete a Book with id
    router.delete("/delete/:id", book.delete);

    // Create a new Book
    router.delete("/", book.deleteAll);

    app.use("/api/books", router);
};
