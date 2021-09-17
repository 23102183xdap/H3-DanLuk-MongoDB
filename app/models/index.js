// Imports
const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Variables
const db = {};
db.mongoose = mongoose; // Mongoose ref
db.url = dbConfig.url; // Connection string
db.author = require("./author.model.js")(mongoose); // Author model
db.book = require("./book.model.js")(mongoose); // Book model
db.category = require("./category.model")(mongoose); // Category model
db.customer = require("./customer.model")(mongoose); // Customer model
db.publisher = require("./publisher.model")(mongoose); // Publisher model

// Export
module.exports = db;
