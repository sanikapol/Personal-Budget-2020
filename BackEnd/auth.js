const jwt = require("jsonwebtoken");
module.exports = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    console.log(req.userData);
    return req.userData;
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};