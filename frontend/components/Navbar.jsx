import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
      <Link href="/"><span className="text-xl font-bold text-primary">CommunityHub</span></Link>
      <div className="flex items-center space-x-4">
        <Link href="/profile/me">Profile</Link>
        <Link href="/admin/dashboard">Admin</Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
