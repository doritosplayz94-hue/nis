// GET /api/search?query=something&type=posts|users|tags
router.get('/search', async (req, res) => {
  try {
    const { query, type } = req.query;
    if (!query) return res.status(400).json({ error: 'Query required' });

    if (type === 'users') {
      const users = await User.find({ username: { $regex: query, $options: 'i' } });
      return res.json(users);
    }

    if (type === 'posts') {
      const posts = await Post.find({ content: { $regex: query, $options: 'i' } }).populate('authorId', 'username avatarUrl');
      return res.json(posts);
    }

    if (type === 'tags') {
      const posts = await Post.find({ tags: { $regex: query, $options: 'i' } }).populate('authorId', 'username avatarUrl');
      return res.json(posts);
    }

    res.status(400).json({ error: 'Invalid type' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
