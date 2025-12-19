import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Mail,
  Newspaper,
  ArrowLeft
} from 'lucide-react';

function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/admin/clients', icon: Users, label: 'Clients' },
    { path: '/admin/contacts', icon: Mail, label: 'Contacts' },
    { path: '/admin/newsletter', icon: Newspaper, label: 'Newsletter' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
  <h1 className="text-2xl font-bold">ConsultPro</h1>
  <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
</div>


        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* BACK TO WEBSITE */}
        <div className="p-4 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Website</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
