const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const {
  getAllUser,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
  getNotFriendUser,
} = require("../controllers/userController");

router.route("/").get(verifyJWT, getAllUser).post(createUser);

router.use(verifyJWT);

router.route("/people").get(getNotFriendUser);

router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

router.route("/profilepicture/:id").patch(uploadProfilePicture);

module.exports = router;
