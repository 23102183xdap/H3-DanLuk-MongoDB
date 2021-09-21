module.exports = app => {
    const category = require("../controllers/category.controller");

    var router = require("express").Router();

    // Create a new Book
    router.post("/create", category.create);

    // Retrieve all Book
    router.get("/", category.findAll);

    // Retrieve a single Book with id
    router.get("/id/:id", category.findOneById);

    router.get("/name/:category", category.findByCategory);

    // Update a Book with id
    router.put("/update/:id", category.update);

    // Delete a Book with id
    router.delete("/delete/:id", category.delete);

    // Create a new Book
    router.delete("/", category.deleteAll);

    // Creates /api/books endpoint
    app.use("/api/category", router);
};
