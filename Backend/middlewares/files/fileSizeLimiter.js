const { createCustomError } = require("../../errors/customError");

const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024; // 5 MB limit

const fileSizeLmiter = (req, res, next) => {
  const { files } = req;
  const filesOverLimit = [];

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) filesOverLimit.push(files[key].name);
  });

  if (filesOverLimit?.length)
    return next(createCustomError("File must be less than 5MB", 413));

  next();
};

module.exports = fileSizeLmiter;
