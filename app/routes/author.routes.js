module.exports = app => {
  const author = require("../controllers/author.controller.js");

  var router = require("express").Router();

  // Create a new Author
  router.post("/create", author.create);

  // Retrieve all Authors
  router.get("/", author.findAll);

  // Retrieve a single Author with id
  router.get("/author/id/:id", author.findOneById);

  router.get("/author/firstname/:firstname", author.findByQuery);

  // Update a Author with id
  router.put("/update/:id", author.update);

  // Delete a Author with id
  router.delete("/delete/:id", author.delete);

  // Create a new Author
  router.delete("/", author.deleteAll);

  // Creates /api/authors endpoint
  app.use("/api/authors", router);
};
