const { hash, compare } = require("bcrypt");

const hashPassword = async (password) => {
  console.log(password);
  return await hash(password, 10);
};

const confirmPassword = async (password, hash) => {
  return await compare(password, hash);
};

module.exports = { hashPassword, confirmPassword };
