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
  const hash = await hashPassword(password);

  return await Users.findByIdAndUpdate(
    id,
    { userName, password: hash, email },
    { new: true }
  ).exec();
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
