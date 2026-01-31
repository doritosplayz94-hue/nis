require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log(err));

const seed = async () => {
  await User.deleteMany();
  await Post.deleteMany();
  await Comment.deleteMany();

  const user1 = await User.create({ username: 'alice', email: 'alice@test.com', passwordHash: 'hashed' });
  const user2 = await User.create({ username: 'bob', email: 'bob@test.com', passwordHash: 'hashed' });

  const post1 = await Post.create({ authorId: user1._id, content: 'Hello world!' });
  const post2 = await Post.create({ authorId: user2._id, content: 'Another post' });

  await Comment.create({ postId: post1._id, authorId: user2._id, content: 'Nice post!' });

  console.log('Seeding done');
  process.exit();
};

seed();
