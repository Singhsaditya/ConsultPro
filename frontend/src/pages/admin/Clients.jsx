import { useEffect, useState } from 'react';
import API_BASE from '../../api';
import { Trash2 } from 'lucide-react';

function Clients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetch(`${API_BASE}/clients`)
      .then(res => res.json())
      .then(setClients);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const newClient = await res.json();
    setClients(prev => [...prev, newClient]);
    setFormData({ name: '', designation: '', description: '', image: '' });
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/clients/${id}`, { method: 'DELETE' });
    setClients(prev => prev.filter(c => c._id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Clients</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input placeholder="Name" required className="w-full p-3 border rounded"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} />

        <input placeholder="Designation" required className="w-full p-3 border rounded"
          value={formData.designation}
          onChange={e => setFormData({ ...formData, designation: e.target.value })} />

        <textarea placeholder="Testimonial" required className="w-full p-3 border rounded"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })} />

        <input placeholder="Image URL" required className="w-full p-3 border rounded"
          value={formData.image}
          onChange={e => setFormData({ ...formData, image: e.target.value })} />

        <button className="bg-green-600 text-white px-6 py-2 rounded">
          Add Client
        </button>
      </form>

      {clients.map(client => (
        <div key={client._id} className="border rounded p-4 mb-4">
          <p className="font-bold">{client.name}</p>
          <p className="text-sm">{client.designation}</p>
          <button
            onClick={() => handleDelete(client._id)}
            className="text-red-600 mt-2 flex items-center gap-1"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Clients;
