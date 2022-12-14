const { verifyToken } = require("../lib/jwt");

const autHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);

  const token = authorization.split(" ")[1];

  try {
    const payload = verifyToken(token);
    req.params.tokenPayload = payload;
    next();
  } catch (error) {
    const { message } = error;
    res.status(401).json({ message });
  }
};

module.exports = { autHandler };
