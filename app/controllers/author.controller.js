const db = require("../models");
const Author = db.author;

// Create and Save a new Author
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Author
  const author = new Author({
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  // Save Author in the database
  author
    .save(author)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Author."
      });
    });
};

// Retrieve all Authors from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

  Author.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Authors."
      });
    });
};

// Find a single Author with an id
exports.findOneById = (req, res) => {
  const id = req.params.id;

  Author.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Author not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Author with id=" + id });
      console.log(err);
    });
};

exports.findByQuery = (req, res) => {
  const firstname = req.params.firstname;
  // TODO Add params for lastname

  Author.find({"firstname": new RegExp(firstname)}).then(data => {
    if(!data)
      res.status(404).send({ message: "Author not found with that name: " + firstname});
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Author with firstname=" + firstname});
    console.log(err);
  })
}

// Update a Author by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Author.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Author with id=${id}. Maybe Author was not found!`
        });
      } else res.send({ message: "Author was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Author with id=" + id
      });
    });
};

// Delete a Author with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Author.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
        });
      } else {
        res.send({
          message: "Author was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Author with id=" + id
      });
    });
};

// Delete all Authors from the database.
exports.deleteAll = (req, res) => {
  Author.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Authors were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Authors."
      });
    });
};
