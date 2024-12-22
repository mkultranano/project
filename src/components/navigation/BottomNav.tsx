import { Home, MessageCircle, User, BarChart2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-md border-t border-[#ffffff1a] px-6 py-4">
      <div className="flex justify-around items-center">
        {[
          { icon: Home, path: '/', label: 'Home' },
          { icon: MessageCircle, path: '/chat', label: 'Chat' },
          { icon: BarChart2, path: '/report', label: 'Report' },
          { icon: User, path: '/profile', label: 'Profile' },
        ].map(({ icon: Icon, path, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-1 ${
              isActive(path) ? 'text-yellow-400' : 'text-[#ffffff99]'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}