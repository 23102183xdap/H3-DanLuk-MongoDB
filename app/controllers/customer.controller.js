const db = require("../models");
const Customer = db.customer;

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Customer
  const customer = new Customer({
    _id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.brithdate
  });

  // Save Customer in the database
  customer
    .save(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

  Customer.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customers."
      });
    });
};

// Find a single Customer with an id
exports.findOneById = (req, res) => {
  const id = req.params.id; // URL Parameter

  Customer.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Customer not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Customer with id=" + id });
      console.log(err);
    });
};

exports.findByQuery = (req, res) => {
  const firstname = req.params.firstname; // URL Parameter
  // TODO Add params for lastname

  Customer.find({"firstname": new RegExp(firstname)}).then(data => {
    if(!data)
      res.status(404).send({ message: "Customer not found with that name: " + firstname});
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Customer with firstname=" + firstname});
    console.log(err);
  })
}

// Update a Customer by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
        });
      } else res.send({ message: "Customer was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id
      });
      console.log(err);
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id; // URL Parameter

  Customer.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
        });
      } else {
        res.send({
          message: "Customer was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id
      });
      console.log(err);
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Customers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Customers."
      });
    });
};
