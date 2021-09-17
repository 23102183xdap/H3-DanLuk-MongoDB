const db = require("../models");
const category = db.category;

// Create and Save a new Category
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Category
    const Category = new Category({
        title: req.body.title,
        pages: req.body.pages,
        author: req.body.author,
        publishDate: req.body.publishDate,
        series: req.body.series,
        coverLink: req.body.coverLink
    });

    // Save Category in the database
    Category
        .save(Category)
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


// TODO Make use of this at some point.
// exports.findByCategory = (req, res) => {
//     const category = req.params.fiction; // URL Parameter

//     Category.find({ "title": new RegExp(category) }).then(data => {
//         if (!data)
//             res.status(404).send({ message: "Category not found with title " + title });
//         else res.send(data);
//     })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({ message: "Error retrieving Category with title=" + title });
//             console.log(err);
//         })
// }

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

// Delete all Categorys from the database.
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Categorys were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Categorys."
            });
        });
};
