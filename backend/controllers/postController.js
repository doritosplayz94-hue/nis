const Post = require('../models/Post');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { content, tags } = req.body;
    let mediaUrls = [];

    if (req.files) {
      for (const file of req.files) {
        const uploaded = await cloudinary.uploader.upload(file.path, { folder: 'posts' });
        mediaUrls.push(uploaded.secure_url);
      }
    }

    const post = await Post.create({
      authorId: req.user.id,
      content,
      tags: tags ? tags.split(',') : [],
      media: mediaUrls
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Feed (Infinite Scroll)
exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('authorId', 'username avatarUrl');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like / Unlike Post
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const index = post.likes.indexOf(req.user.id);
    if (index === -1) post.likes.push(req.user.id);
    else post.likes.splice(index, 1);

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (post.authorId.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Not authorized' });

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
