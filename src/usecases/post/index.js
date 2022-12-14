const Posts = require("../../models/post").model;

const create = async (title, text, tags, image, user, comments, date) => {
  const post = new Posts({ title, text, tags, image, user, comments, date });
  return await post.save();
};

const getUserPosts = async (user) => Posts.find({ user }).exec();

const getPostById = async (id) => await Posts.findById(id).exec();

const updatePost = async (id, title, text, tags, image) =>
  await Posts.findByIdAndUpdate(id, {
    title,
    text,
    tags,
    image,
  }).exec();

const deletePost = async (id) => await Posts.findByIdAndDelete(id).exec();

module.exports = { create, getUserPosts, getPostById, updatePost, deletePost };
