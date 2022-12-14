const Posts = require("../../models/post").model;

const create = async (title, text, tags, image, user, comments, date) => {
  const post = new Posts({ title, text, tags, image, user, comments, date });
  return await post.save();
};
