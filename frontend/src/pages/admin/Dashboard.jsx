import { useEffect, useState } from 'react';
import API_BASE from '../../api';

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/projects`).then(r => r.json()),
      fetch(`${API_BASE}/clients`).then(r => r.json()),
      fetch(`${API_BASE}/contacts`).then(r => r.json()),
      fetch(`${API_BASE}/subscribers`).then(r => r.json()),
    ]).then(([p, c, co, s]) => {
      setStats({
        projects: p.length,
        clients: c.length,
        contacts: co.length,
        subscribers: s.length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <ul className="space-y-2">
        <li>Total Projects: {stats.projects}</li>
        <li>Total Clients: {stats.clients}</li>
        <li>Total Contacts: {stats.contacts}</li>
        <li>Total Subscribers: {stats.subscribers}</li>
      </ul>
    </div>
  );
}

export default Dashboard;
