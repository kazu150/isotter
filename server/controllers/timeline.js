const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
    const posts = await Post.find().populate('userId');
    res.status(200).json({
        posts: posts
    });
}

exports.createPost = async (req, res, next) => {
    const user = req.body.userId;
    const content = req.body.content;
    const userId = await User.findById(req.body.userId);
    const post = new Post({
        userId: user,
        content: content
    });
    post
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: {...result._doc, userId}
            })
        })
        .catch(err => console.log(err))
}

exports.deletePost = async (req, res, next) => {
    const postId = req.body.postId;
    Post.findByIdAndRemove(postId)
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'post deleted successfully!',
                deletedPost: result
            })
        })
        .catch(err => console.log(err))
}