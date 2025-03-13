import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 md:top-0 w-full bg-white border-t md:border-b border-gray-200 px-4 py-3 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="hidden md:block text-xl font-semibold">
          Instagram
        </Link>
        
        <div className="flex items-center justify-around md:justify-end w-full md:w-auto space-x-6">
          <Link to="/" className="text-gray-700 hover:text-black">
            <Home className="w-6 h-6" />
          </Link>
          <Link to="/search" className="text-gray-700 hover:text-black">
            <Search className="w-6 h-6" />
          </Link>
          <Link to="/create" className="text-gray-700 hover:text-black">
            <PlusSquare className="w-6 h-6" />
          </Link>
          <Link to="/activity" className="text-gray-700 hover:text-black">
            <Heart className="w-6 h-6" />
          </Link>
          <Link to="/profile" className="text-gray-700 hover:text-black">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}