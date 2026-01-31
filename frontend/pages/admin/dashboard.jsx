import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import API from '../../utils/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const resUsers = await API.get('/admin/users');
        const resPosts = await API.get('/admin/posts');
        const resComments = await API.get('/admin/comments');
        setUsers(resUsers.data);
        setPosts(resPosts.data);
        setComments(resComments.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    try {
      await API.delete(`/admin/${type}/${id}`);
      if (type === 'users') setUsers(users.filter(u => u._id !== id));
      if (type === 'posts') setPosts(posts.filter(p => p._id !== id));
      if (type === 'comments') setComments(comments.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>

        {/* Users Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Users</h2>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded">
            <table className="min-w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{u.username}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.role}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete('users', u._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Posts Table */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Posts</h2>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded">
            <table className="min-w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Content</th>
                  <th className="px-4 py-2 text-left">Likes</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(p => (
                  <tr key={p._id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{p.authorId.username}</td>
                    <td className="px-4 py-2">{p.content.slice(0,50)}...</td>
                    <td className="px-4 py-2">{p.likes.length}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete('posts', p._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Comments Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Comments</h2>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded">
            <table className="min-w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Content</th>
                  <th className="px-4 py-2 text-left">Post</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map(c => (
                  <tr key={c._id} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{c.authorId.username}</td>
                    <td className="px-4 py-2">{c.content.slice(0,50)}...</td>
                    <td className="px-4 py-2">{c.postId.content.slice(0,30)}...</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete('comments', c._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
