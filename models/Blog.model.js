const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  image: String,
  userId: { type: String, required: true },
});

const BlogsModel = mongoose.model("Blog", blogSchema);

module.exports = {
  BlogsModel,
};
