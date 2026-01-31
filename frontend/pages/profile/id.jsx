import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import PostCard from '../../components/PostCard';
import API from '../../utils/api';
import PfpUpload from '../../components/PfpUpload';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const resUser = await API.get(`/auth/me`);
      setUser(resUser.data);
      const resPosts = await API.get(`/posts?author=${id}`);
      setPosts(resPosts.data);
    };
    fetchData();
  }, [id]);

  const handlePfp = async (url) => {
    await API.put('/auth/update-avatar', { avatarUrl: url });
    setUser({...user, avatarUrl: url});
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-4">
        <div className="flex items-center space-x-4 mb-4">
          <img src={user.avatarUrl || '/default-avatar.png'} className="w-20 h-20 rounded-full"/>
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p>{user.bio}</p>
          </div>
        </div>
        <PfpUpload onUpload={handlePfp} />
        <div className="mt-4">
          {posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
