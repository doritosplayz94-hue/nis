import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import API from '../utils/api';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const res = await API.get('/posts');
      setPosts(res.data);
    };
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-4">
        {posts.map(post => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
