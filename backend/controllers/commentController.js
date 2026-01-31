const Comment = require('../models/Comment');

// Create comment (nested)
exports.createComment = async (req, res) => {
  try {
    const { postId, content, parentId } = req.body;
    const comment = await Comment.create({
      postId,
      content,
      parentId: parentId || null,
      authorId: req.user.id
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Like / Unlike comment
exports.toggleLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const index = comment.likes.indexOf(req.user.id);
    if (index === -1) comment.likes.push(req.user.id);
    else comment.likes.splice(index, 1);

    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.authorId.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Not authorized' });

    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
