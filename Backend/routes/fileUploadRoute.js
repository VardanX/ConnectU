const fileUploadController = require("../controllers/fileUploadController");
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const fileExists = require("../middlewares/files/fileExists");
const fileExtensionLimiter = require("../middlewares/files/fileExtensionLimiter");
const fileSizeLmiter = require("../middlewares/files/fileSizeLimiter");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .post(
    fileUpload({ createParentPath: true, useTempFiles: true }),
    fileExists,
    fileExtensionLimiter([".png", ".jpg", ".jpeg"]),
    fileSizeLmiter,
    fileUploadController
  );

module.exports = router;
