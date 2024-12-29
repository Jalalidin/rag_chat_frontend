import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, FileText, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Chat', href: '/', icon: MessageCircle },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col w-64 bg-[var(--background)] border-r border-[var(--border)]">
      <div className="flex items-center h-16 px-4 border-b border-[var(--border)]">
        <h1 className="text-xl font-bold text-[var(--foreground)]">RAG Chat</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-4 py-2 text-sm rounded-md',
                location.pathname === item.href
                  ? 'bg-[var(--muted)] text-[var(--foreground)]'
                  : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[var(--border)]">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-[var(--muted-foreground)] rounded-md hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}