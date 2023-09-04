const { Router } = require("express");

const { BlogsModel } = require("../models/Blog.model");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const blogController = Router();

blogController.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.author) {
      query.author = req.query.author;
    }
    const userId = req.body.userId;

    if (userId) {
      query.userId = userId;
    }

    const blogs = await BlogsModel.find(query);
    res.send(blogs);
  } catch (error) {
    console.log(error);
  }
});

blogController.post("/create", async (req, res) => {
  const {title,
    category,
    author,
    content,
    image,
    userId,} = req.body;
  console.log(req.body);
  const blog = new BlogsModel({
    title,
    category,
    author,
    content,
    image,
    userId,
  });
  try {
    await blog.save();
    console.log("blog added");
    res.send("blog added");
  } catch (error) {
    console.log(error);
  }
});
blogController.delete("/delete/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const user = req.user;

  if (user.id !== BlogsModel.findOne({ _id: blogId }).userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await BlogsModel.findOneAndDelete({ _id: blogId , userId:req.body.userId});

  res.send({ message: "Blog deleted successfully" });
});
blogController.patch("/edit/:blogId", async (req, res) => {
  const { blogId } = req.params;
  let Update_val = await BlogsModel.findOneAndUpdate(
    { _id: blogId, userId: req.body.userId },
    { ...req.body }
  );
  res.send(Update_val);
});
module.exports = {
  blogController,
};
