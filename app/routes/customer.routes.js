module.exports = app => {
    const customer = require("../controllers/customer.controller");

    var router = require("express").Router();

    // Create a new Customer
    router.post("/create", customer.create);

    // Retrieve all Customer
    router.get("/", customer.findAll);

    // Retrieve a single Customer with id
    router.get("/id/:id", customer.findOneById);

    router.get("/firstname/:firstname", customer.findByQuery);

    // Update a Customer with id
    router.put("/update/:id", customer.update);

    // Delete a Customer with id
    router.delete("/delete/:id", customer.delete);

    // Create a new Customer
    router.delete("/", customer.deleteAll);

    // Creates /api/Customers endpoint
    app.use("/api/customer", router);
};
