const jwt = require("jsonwebtoken");

const authorizer = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }

  const token = authorization.split(" ")[1]; // this is the second part of the token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userObj = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid auth token");
  }
};

module.exports = authorizer;
