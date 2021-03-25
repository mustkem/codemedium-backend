const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const Post = require("../models/post");
const User = require("../models/adminUser");

exports.getPosts = (req, res, next) => {
  const userId = req.userId;

  User.findById(userId)
    .populate({
      path: "posts",
      model: "Post",
      populate: {
        path: "categories",
        model: "Category",
      },
    })
    .then((user) => {
      return user;
    })
    .then((user) => {
      const posts = user.posts;
      res.status(200).json({
        message: "Fetched posts successfully.",
        posts: posts,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors;
    throw error;
  }

  const authorCode = req.body.authorCode;
  if (authorCode !== "262225") {
    const error = new Error("Invalid request");
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path;
  const title = req.body.title;
  const content = req.body.content;
  let creator;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    bolbImageUrl: new Buffer(fs.readFileSync(req.file.path)).toString("base64"),
    slug: req.body.slug,
    desc: req.body.desc,
    categories: req.body.categories,
    creator: req.userId,
  });
  post
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Post created successfully!",
        post: post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .populate("categories")
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Post fetched.", post: post });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;

  const authorCode = req.body.authorCode;
  if (authorCode !== "262225") {
    const error = new Error("Invalid request");
    error.statusCode = 422;
    throw error;
  }

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed, entered data is incorrect.');
  //   error.statusCode = 422;
  //   throw error;
  // }

  // const title = req.body.title;
  // const content = req.body.content;
  // const title = req.body.title;

  // let imageUrl = req.body.image;
  // if (req.file) {
  //   imageUrl = req.file.path;
  // }
  // if (!imageUrl) {
  //   const error = new Error('No file picked.');
  //   error.statusCode = 422;
  //   throw error;
  // }

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized!");
        error.statusCode = 403;
        throw error;
      }
      // if (imageUrl !== post.imageUrl) {
      //   clearImage(post.imageUrl);
      // }

      Object.keys(req.body).forEach((key) => {
        post[key] = req.body[key];
      });

      if(req.file){
        post.bolbImageUrl = new Buffer(fs.readFileSync(req.file.path)).toString("base64");
      }

      // post.title = title;
      // post.imageUrl = imageUrl;
      // post.content = content;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Post updated!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  const authorCode = req.body.authorCode;
  if (authorCode !== "262225") {
    const error = new Error("Invalid request");
    error.statusCode = 422;
    throw error;
  }

  let postData = null;

  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find post.");
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        const error = new Error("Not authorized!");
        error.statusCode = 403;
        throw error;
      }
      // Check logged in user
      // clearImage(post.imageUrl);
      postData = post;
      return Post.findByIdAndRemove(post._id);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postData._id);
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Deleted post." });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
