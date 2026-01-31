import { useState, useEffect } from 'react';
import API from '../utils/api';

export default function Comment({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const res = await API.get(`/comments?postId=${postId}`);
      setComments(res.data);
    };
    fetchComments();
  }, [postId]);

  const submit = async () => {
    if (!content) return;
    const res = await API.post('/comments', { postId, content });
    setComments([...comments, res.data]);
    setContent('');
  };

  return (
    <div className="mt-2">
      {comments.map(c => (
        <div key={c._id} className="text-sm mb-1">
          <span className="font-bold">{c.authorId.username}</span> {c.content}
        </div>
      ))}
      <div className="flex mt-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-1 rounded border"
        />
        <button onClick={submit} className="ml-2 text-primary font-bold">Post</button>
      </div>
    </div>
  );
}
