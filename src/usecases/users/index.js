const Users = require("../../models/user").model;
const { hashPassword, confirmPassword } = require("../../lib/encrypt");
const { checkToken, setUpToken } = require("../../lib/jwt");

const create = async (data) => {
  const { userName, password, email } = data;
  console.log(data);
  const passwordHashed = await hashPassword(password);
  const user = new Users({
    userName,
    password: passwordHashed,
    email,
  });
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
  console.log(isVerified);
  if (!isVerified) throw new Error("Wrong password");
  return setUpToken({ sub: user._id });
};

const delUser = async (id, userName) =>
  await Users.findByIdAndDelete(id, userName).exec();

module.exports = {
  create,
  getUserById,
  getAllUsers,
  updateUser,
  findByEmail,
  authenticate,
  delUser,
};
