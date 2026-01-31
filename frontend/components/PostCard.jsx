import { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import API from '../utils/api';
import Comment from './Comment';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.likes.includes(localStorage.getItem('userId')));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const toggleLike = async () => {
    const res = await API.put(`/posts/like/${post._id}`);
    setLiked(res.data.likes.includes(localStorage.getItem('userId')));
    setLikesCount(res.data.likes.length);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <img src={post.authorId.avatarUrl || '/default-avatar.png'} className="w-10 h-10 rounded-full mr-2"/>
        <span className="font-bold">{post.authorId.username}</span>
      </div>
      <p className="mb-2">{post.content}</p>
      {post.media.map((url, i) => (
        <img key={i} src={url} className="w-full rounded mb-2"/>
      ))}
      <div className="flex items-center space-x-4">
        <button onClick={toggleLike}>
          {liked ? <FaHeart className="text-red-500"/> : <FaRegHeart/>} {likesCount}
        </button>
        <button><FaComment/> {post.comments?.length || 0}</button>
      </div>
      <Comment postId={post._id} />
    </div>
  );
}
