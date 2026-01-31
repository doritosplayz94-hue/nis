const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Get all users
router.get('/users', auth, role('admin','moderator'), async (req,res)=>{
  const users = await User.find();
  res.json(users);
});

// Get all posts
router.get('/posts', auth, role('admin','moderator'), async (req,res)=>{
  const posts = await Post.find().populate('authorId','username');
  res.json(posts);
});

// Get all comments
router.get('/comments', auth, role('admin','moderator'), async (req,res)=>{
  const comments = await Comment.find().populate('authorId','username').populate('postId','content');
  res.json(comments);
});

// Delete user/post/comment
router.delete('/:type/:id', auth, role('admin','moderator'), async (req,res)=>{
  const {type,id} = req.params;
  try {
    if(type==='users') await User.findByIdAndDelete(id);
    if(type==='posts') await Post.findByIdAndDelete(id);
    if(type==='comments') await Comment.findByIdAndDelete(id);
    res.json({message:'Deleted successfully'});
  } catch(err){res.status(500).json({error:err.message})}
});

module.exports = router;
