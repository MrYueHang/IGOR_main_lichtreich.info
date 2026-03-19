import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Users,
  Mail,
  MessageSquare,
  Megaphone,
  User,
  FileText,
  Briefcase,
  Calendar,
  Image as ImageIcon,
  DollarSign,
  FolderOpen,
  CheckSquare,
  Share2,
  Bot,
  LogOut,
  LayoutDashboard,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Kunden', href: '/admin/customers', icon: Users },
  { name: 'Email', href: '/admin/email', icon: Mail },
  { name: 'Anfragen', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'PR', href: '/admin/pr', icon: Megaphone },
  { name: 'Profil & Account', href: '/admin/profile', icon: User },
  { name: 'Contenttable', href: '/admin/content', icon: FileText },
  { name: 'Workingspace', href: '/admin/workspace', icon: Briefcase },
  { name: 'Databases (Muster)', href: '/admin/databases', icon: Database },
  { name: 'Terminplaner', href: '/admin/calendar', icon: Calendar },
  { name: 'Gallerie', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Preise', href: '/admin/prices', icon: DollarSign },
  { name: 'Projekte', href: '/admin/projects', icon: FolderOpen },
  { name: 'Checklisten', href: '/admin/checklists', icon: CheckSquare },
  { name: 'Social Media', href: '/admin/social', icon: Share2 },
  { name: 'KI-Assistenz', href: '/admin/ai', icon: Bot },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-zinc-100 font-sans text-zinc-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200">
          <span className="text-lg font-semibold tracking-tight">Family Back-Office</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    isActive
                      ? 'bg-zinc-100 text-zinc-900'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? 'text-zinc-900' : 'text-zinc-400 group-hover:text-zinc-500',
                      'mr-3 flex-shrink-0 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-zinc-200">
          <Link
            to="/"
            className="group flex items-center px-3 py-2 text-sm font-medium text-zinc-600 rounded-md hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
          >
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-zinc-400 group-hover:text-zinc-500" />
            Zur Website
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
