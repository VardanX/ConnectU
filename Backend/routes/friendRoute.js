const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const {
  getAllFriend,
  addFriend,
  removeFriend,
  isFriend,
} = require("../controllers/friendController");

router.use(verifyJWT);

router.route("/").get(getAllFriend);
router.route("/:id").get(isFriend);
router.route("/add").patch(addFriend);
router.route("/remove").patch(removeFriend);

module.exports = router;
