const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');
const isAuth = require('../../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  '/post',
  isAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 1 }),
    body('content')
      .trim()
      .isLength({ min: 5 })
  ],
  feedController.createPost
);

router.get('/post/:slug', isAuth, feedController.getPost);

router.put(
  '/post/:slug',
  isAuth,
  feedController.updatePost
);

router.delete('/post/:slug', isAuth, feedController.deletePost);

module.exports = router;
