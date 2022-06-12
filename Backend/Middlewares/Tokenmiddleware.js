const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //console.log(req.header("authtoken"));
  try {
    let usertoken = req.header("authtoken");

    if (!usertoken) {
      res.status(400).send("Token not found");
      res.end();
    }
    let userDecodedToken = jwt.verify(usertoken, "Myntraclone");
    req.user = userDecodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
    res.end();
  }
};
