const jwt = require("jsonwebtoken");
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @desc checks? if the user is verified
 */
const verifyJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  if (!authHeaders?.startsWith("Bearer"))
    return res.status(401).json({ message: "unauthorized user" });

  // split the headers and set token excluding Bearer string
  const token = authHeaders.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.status(403).json({ message: "forbidden" });
    req.userId = decoded.UserInfo.userId;
    // console.log(req);
    next();
  });
};

module.exports = verifyJWT;
