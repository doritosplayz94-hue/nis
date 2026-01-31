import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import API from '../utils/api';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFeed = async () => {
      const res = await API.get('/posts');
      setPosts(res.data);
    };
    fetchFeed();
  }, []);

  // Start Live Stream
  const startLive = () => {
    const streamId = uuidv4(); // generate unique stream ID
    router.push(`/live/${streamId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-4">
        {/* Search Bar */}
        <SearchBar />

        {/* Start Live Stream Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={startLive}
            className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-pink-600 transition"
          >
            Start Live Stream
          </button>
        </div>

        {/* Feed */}
        {posts.map(post => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
