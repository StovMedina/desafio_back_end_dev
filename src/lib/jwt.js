const { sign, verify } = require("jsonwebtoken");
const { app } = require("./config");

const setUpToken = (payload) => sign(payload, app.secret, { expiresIn: "3h" });

const checkToken = (token) => verify(token, app.secret);

module.exports = { setUpToken, checkToken };