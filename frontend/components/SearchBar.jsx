import { useState } from 'react';
import API from '../utils/api';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [type, setType] = useState('users');

  const handleSearch = async () => {
    if (!query) return;
    const res = await API.get(`/posts/search?query=${query}&type=${type}`);
    setResults(res.data);
  };

  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder={`Search ${type}...`}
          className="flex-1 p-2 rounded border"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="p-2 border rounded" value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="users">Users</option>
          <option value="posts">Posts</option>
          <option value="tags">Tags</option>
        </select>
        <button onClick={handleSearch} className="bg-primary px-4 py-2 text-white rounded">Search</button>
      </div>
      <div className="mt-2">
        {results.map((item) => (
          <div key={item._id} className="bg-white dark:bg-gray-800 p-2 rounded mb-1 shadow">
            {type === 'users' && <Link href={`/profile/${item._id}`}>{item.username}</Link>}
            {(type === 'posts' || type === 'tags') && <span>{item.content}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
