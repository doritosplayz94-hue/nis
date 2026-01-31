import { useRouter } from 'next/router';
import LiveStream from '../../components/LiveStream';
import Navbar from '../../components/Navbar';

export default function LivePage() {
  const router = useRouter();
  const { id } = router.query; // unique stream ID

  if (!id) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-4">
        <h1 className="text-2xl font-bold mb-4 text-primary">Live Stream</h1>
        <p className="mb-4">Stream ID: <span className="font-mono">{id}</span></p>
        <LiveStream streamId={id} />
      </div>
    </div>
  );
}
