const { createCustomError } = require("../errors/customError");
const allowedOrigin = require("./allowedOrigin");

/**
 * @desc limiting the request only by the allowed origin || origin by the postman
 */

const corsOptions = {
  origin: (origin, callback) => {
    allowedOrigin.indexOf(origin) !== -1 || !origin
      ? callback(null, true)
      : callback(createCustomError("Not allowed by the cors", 403));
  },
  credentials: true, // access control allowed credentials header
  optionsSuccessStatus: 200, // success status
  preflightContinue: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};
module.exports = corsOptions;
