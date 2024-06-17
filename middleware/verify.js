const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;

const validateSession = (req, res, next) => {
  let authToken = req.cookies["rz_token"];
  if (authToken && authToken.length > 0) {
    jwt.verify(authToken, privateKey, (err, user) => {
      if (err) {
        res.status(403).json("Unauthorized Request");
      } else {
        next();
      }
    });
  } else {
    res.status(403).json("Unauthorized Request");
  }
};

module.exports = validateSession;
