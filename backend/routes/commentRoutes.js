const router = require('express').Router();
const { createComment, toggleLike, deleteComment } = require('../controllers/commentController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createComment);
router.put('/like/:id', auth, toggleLike);
router.delete('/:id', auth, deleteComment);

module.exports = router;
