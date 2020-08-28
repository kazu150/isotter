const express = require('express');

const timelineController = require('../controllers/timeline');

const router = express.Router();

router.get('/posts', timelineController.getPosts);
router.post('/post', timelineController.createPost);
router.delete('/post', timelineController.deletePost);

module.exports = router;