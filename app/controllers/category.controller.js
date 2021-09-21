const db = require("../models");
const Category = db.category;

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Category
    const category = new Category({
        name: req.body.name
    });

    // Save Category in the database
    Category
        .save(category)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category."
            });
        });
};

// Retrieve all Categorys from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};

    Category.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Categorys."
            });
        });
};

// Find a single Category with an id
exports.findOneById = (req, res) => {
    const id = req.params.id; // URL Parameter
    Category.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Category not found with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Category with id=" + id });
            console.log(err);
        });
};

// Find a category with the name of it
exports.findByCategory = (req, res) => {
    const category = req.params.name; // URL Parameter

    Category.find({ "name": new RegExp(category) }).then(data => {
        if (!data)
            res.status(404).send({ message: "Category not found with name " + category });
        else res.send(data);
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Category with name=" + category });
            console.log(err);
        })
}

// Update a Category by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id; // URL Parameter

    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found!`
                });
            } else res.send({ message: "Category was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
            console.log(err);
        });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id; // URL Parameter

    Category.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            } else {
                res.send({
                    message: "Category was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id
            });
            console.log(err);
        });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Categories were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Categories."
            });
        });
};
