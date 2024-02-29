const express = require("express");
const router = express.Router();
const loginRateLimit = require("../middlewares/loginLimiter");
const {
  login,
  logout,
  getRefreshedAccessToken,
  resetPassword,
} = require("../controllers/authController");

router.route("/").post(loginRateLimit, login);
router.route("/refresh").get(getRefreshedAccessToken);
router.route("/logout").post(logout);
router.route("/reset").post(resetPassword);

module.exports = router;
