const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailSend = require("../services/nodemailer");

/**
 * @description Login user
 * @route POST /auth
 * @access Public
 */
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  // Confirm data
  if (!email || !password)
    return next(createCustomError("Email or password is required.", 400));

  // Confrim valid email address
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return next(createCustomError("Enter a Valid email address", 400));

  const user = await User.findOne({ email }).lean().exec();

  if (!user) {
    return next(createCustomError("User not found.", 404));
  }
  // Compare the hash password
  const isUserLoggedIn = await bcrypt.compare(password, user.password);

  if (!isUserLoggedIn)
    return next(createCustomError("Incorrect email or password", 401));

  // User Information
  const UserInfo = {
    userId: user._id.valueOf(),
  };

  // Generate access token
  const accessToken = jwt.sign(
    {
      UserInfo,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    {
      UserInfo,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // set secure cookiew with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accessible only by the web server
    secure: true, // https
    sameSite: "None", // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie exprire
  });

  // send accessToken with user info
  return res.status(200).json({ message: "Login successfully", accessToken });
});

/**
 * @description get Refresh access token
 * @route GET /auth/refresh
 * @access Public
 */
const getRefreshedAccessToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return next("Unauthorized user", 401);

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      console.log(error);
      if (error) return res.status(403).json({ message: "Forbidden" });

      const { UserInfo } = decoded;

      // Check if the user exist or not?
      const user = await User.findOne({ userId: decoded.UserInfo.userId })
        .lean()
        .exec();

      if (!user) return next(createCustomError("Unauthorized", 401));

      const accessToken = jwt.sign(
        { UserInfo },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return res.status(200).json({ accessToken });
    }
  );
};

/**
 * @description Logout user
 * @route POST /auth/logout
 * @access public - to clear cookie if exists
 */
const logout = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return next(createCustomError("Unauthorized user", 401));

  // clear cookie
  res.clearCookie("jwt", {
    httpOnly: true, // accessible only by the web server
    secure: true, // https
    sameSite: "None", // cross-site cookie
  });
  return res.status(200).json({ message: "Logout successfully" });
};

/**
 * @description Logout user
 * @route POST /auth/resetpassword
 * @access public - to clear cookie if exists
 */
const resetPassword = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  // Confrim data
  if (!email || !password)
    return next(createCustomError("All fields are requied", 400));

  // Confrim valid email address
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return next(createCustomError("Enter a Valid email address", 400));

  // Check if the user exist?
  const user = await User.findOne({ email }).exec();
  if (!user) return next(createCustomError("user not found", 404));

  // hash password
  const saltRounds = 10;
  user.password = await bcrypt.hash(password, saltRounds);

  await user.save();
  mailSend(user.firstName, email);
  return res.status(200).json({ message: "Password has been reset" });
});

module.exports = {
  login,
  getRefreshedAccessToken,
  logout,
  resetPassword,
};
