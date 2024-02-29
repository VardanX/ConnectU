const rateLimit = require("express-rate-limit");

const loginRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after a 60 second pause",
  },
  handler: (req, res, next, options) =>
    res.status(options.statusCode).send(options.message),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginRateLimit;
