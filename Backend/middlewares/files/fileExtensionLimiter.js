const path = require("path");
const { createCustomError } = require("../../errors/customError");

/**
 *
 * @param {*} allowedFileExtension type array
 * @desc  checks the file extension, only allowed file is able to upload
 */
const fileExtensionLimiter = (allowedFileExtension) => {
  return (req, res, next) => {
    const { files } = req;
    const fileExentionArray = [];

    Object.keys(files).forEach((key) =>
      fileExentionArray.push(path.extname(files[key].name).toLowerCase())
    );
    const isFileAllowed = fileExentionArray.every((extension) =>
      allowedFileExtension.includes(extension)
    );

    if (!isFileAllowed)
      return next(
        createCustomError(
          `Only ${allowedFileExtension.toString()} are allowed`,
          422
        )
      );

    next();
  };
};

module.exports = fileExtensionLimiter;
