const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  tags: { type: String, required: true, trim: true },
  image: {},
  user: {},
  comments: {},
  date: {},
  tags: {},
});

const model = mongoose.model("Post", schema);

module.exports = {
  schema,
  model,
};
