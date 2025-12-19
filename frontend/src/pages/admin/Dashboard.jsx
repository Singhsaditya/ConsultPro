import { useEffect, useState } from 'react';
import { FolderKanban, Users, Mail, Newspaper } from 'lucide-react';
import API_BASE from '../../api';

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [projects, clients, contacts, subscribers] = await Promise.all([
        fetch(`${API_BASE}/projects`).then(res => res.json()),
        fetch(`${API_BASE}/clients`).then(res => res.json()),
        fetch(`${API_BASE}/contacts`).then(res => res.json()),
        fetch(`${API_BASE}/subscribers`).then(res => res.json()),
      ]);

      setStats({
        projects: projects.length,
        clients: clients.length,
        contacts: contacts.length,
        subscribers: subscribers.length,
      });
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderKanban,
      bg: 'bg-blue-500',
    },
    {
      title: 'Total Clients',
      value: stats.clients,
      icon: Users,
      bg: 'bg-green-500',
    },
    {
      title: 'Contact Submissions',
      value: stats.contacts,
      icon: Mail,
      bg: 'bg-orange-500',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.subscribers,
      icon: Newspaper,
      bg: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Overview of ConsultPro platform activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-600">{card.title}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {card.value}
              </p>
            </div>
            <div className={`${card.bg} p-4 rounded-lg`}>
              <card.icon className="w-8 h-8 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
