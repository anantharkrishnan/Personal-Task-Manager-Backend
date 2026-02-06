const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "unauthorized user" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = { id: decodedToken.id, role: decodedToken.role };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "invalid token" });
  }
};

module.exports = authUser;
