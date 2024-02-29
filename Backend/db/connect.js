const mongoose = require("mongoose");

/**
 * @info When strict option is set to true, Mongoose will ensure that only the fields
 *       that are specified in your Schema will be saved in the database,
 *       and all other fields will not be saved (if some other fields are sent).
 */

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(url);
};

module.exports = connectDB;
