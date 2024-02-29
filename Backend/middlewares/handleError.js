const { CustomError } = require("../errors/customError");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} error
 * @returns custom error if error parameter is the instance of custom error class
 *          else status 500 with message
 */
const handleError = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  console.log(error);
  return res
    .status(500)
    .json({ message: "Something went wrong, please try again" });
};

module.exports = handleError;
