const jwt = require("jsonwebtoken");

const authenticationToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(400).json({ message: "Access Denied" });

    const jwtToken = token.split(" ")[1];

    const verifiedToken = jwt.verify(jwtToken, "123");

    req.user = verifiedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token", error: error.message });
  }
};

module.exports = authenticationToken;
