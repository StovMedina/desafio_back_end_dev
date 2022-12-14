const Users = require("../../models/user").model;
const { hashPassword, confirmPassword } = require("../../lib/encrypt");
const { checkToken } = require("../../lib/jwt");

const create = async (data) => {
  const { userName, password, email } = data;

  const passwordHashed = await hashPassword(password);
  const user = new Users({ userName, passwordHashed, email });
  return await user.save();
};

const getUserById = async (id) => await Users.findById(id).exec();

const getAllUsers = async () => {
  return await Users.find({}).exec();
};

const updateUser = async (id, data) => {
  const { userName, password, email } = data;

  data.userName = userName ? userName : data.userName;
  data.password = password ? password : data.password;
  data.email = email ? email : data.email;
  return await Users.findByIdAndUpdate(id, data).exec();
};

const findByEmail = async (email) => await Users.findOne({ email });

const authenticate = async (email, password) => {
  const user = await findByEmail(email);
  const hash = user.password;

  const isVerified = await confirmPassword(password, hash);
  if (!isVerified) throw new Error("Wrong password");
  return checkToken({ sub: user._id });
};

const delUser = async (id) => await Users.findByIdAndDelete(id).exec();

module.exports = {
  create,
  getUserById,
  getAllUsers,
  updateUser,
  findByEmail,
  authenticate,
  delUser,
};
