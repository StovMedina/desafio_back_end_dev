const { hash, compare } = require("bcrypt");

const hashPassword = async (password) => {
  console.log(password);
  return await hash(password, 10);
};

const confirmPassword = async (password, hash) => {
  const parallelResult = await compare(password, hash);
  return parallelResult;
};

module.exports = { hashPassword, confirmPassword };
