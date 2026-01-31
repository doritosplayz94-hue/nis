import { useState } from 'react';
import API from '../utils/api';

export default function PfpUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('media', file);
    const res = await API.post('/posts/upload', formData);
    if (res.data.url) onUpload(res.data.url);
  };

  return (
    <div className="flex items-center space-x-2">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
