const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  tags: { type: [String] },
  image: { type: String },
  user: { type: mongoose.ObjectId, ref: "user" },
  comments: { type: [String] },
  date: { type: Date, require: true },
});

const model = mongoose.model("Post", schema);

module.exports = {
  schema,
  model,
};
