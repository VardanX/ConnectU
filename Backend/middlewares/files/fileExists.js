const { createCustomError } = require("../../errors/customError");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @desc   checks whether the file exist or not on request
 */
const fileExists = (req, res, next) => {
  const isFileExists = req.files;
  if (!isFileExists) return next(createCustomError("File not found", 404));
  next();
};

module.exports = fileExists;
