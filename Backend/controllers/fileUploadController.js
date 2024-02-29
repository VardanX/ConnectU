const { createCustomError } = require("../errors/customError");
const cloudinary = require("../services/cloudinary");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @desc upload file to the cloudinary
 */
const fileUploadController = (req, res, next) => {
  console.log(req.files);
  const { files } = req;
  Object.keys(files).forEach(async (key) => {
    try {
      /**
       * fetch_format parameter can be set to auto (f_auto in URLs) in order to perform automatic
       * format selection based on the requesting browser
       * */
      cloudinary.url(`${files[key].name}`, { fetch_format: "auto" });
      const { secure_url } = await cloudinary.uploader.upload(
        files[key].tempFilePath
      );
      return res
        .status(200)
        .json({ secure_url, message: "file has been uploaded succesfully" });
    } catch (error) {
      return next(createCustomError("error on uploading file", 409));
    }
  });
};

module.exports = fileUploadController;
