const router = require('express').Router();
const { createPost, getFeed, toggleLike, deletePost } = require('../controllers/postController');
const auth = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Feed
router.get('/', auth, getFeed);

// Create post
router.post('/', auth, upload.array('media', 5), createPost);

// Like / Unlike
router.put('/like/:id', auth, toggleLike);

// Delete post
router.delete('/:id', auth, deletePost);

module.exports = router;
