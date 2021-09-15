const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.author = require("./author.model.js")(mongoose);
db.book = require("./book.model.js")(mongoose);
db.category = require("./category.model")(mongoose);
db.customer = require("./customer.model")(mongoose);
db.publisher = require("./publisher.model")(mongoose);
db.featured = require("./featured.model")(mongoose);

module.exports = db;
