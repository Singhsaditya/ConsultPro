import { useEffect, useState } from 'react';
import { Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import API_BASE from '../../api';

function Clients() {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image: '',
  });

  // FETCH CLIENTS
  useEffect(() => {
    fetch(`${API_BASE}/clients`)
      .then(res => res.json())
      .then(data => setClients(data));
  }, []);

  // ADD CLIENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const newClient = await res.json();
    setClients([newClient, ...clients]);
    setFormData({
      name: '',
      designation: '',
      description: '',
      image: '',
    });
  };

  // DELETE CLIENT
  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/clients/${id}`, {
      method: 'DELETE',
    });

    setClients(clients.filter(c => c._id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Clients Management</h1>
        <p className="text-gray-600 mt-2">Add and manage client testimonials</p>
      </div>

      {/* ADD CLIENT */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Add New Client
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Client Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            placeholder="Client Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            placeholder="Designation (e.g. CEO, Manager)"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            placeholder="Client Testimonial"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
            rows={4}
            required
          />

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Client
          </button>
        </form>
      </div>

      {/* CLIENT LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client._id} className="border rounded-lg p-6">
            <img
              src={client.image}
              alt={client.name}
              className="w-16 h-16 rounded-full mb-4"
            />
            <h4 className="font-bold">{client.name}</h4>
            <p className="text-sm text-blue-600">{client.designation}</p>
            <p className="text-gray-600 italic mt-2">
              "{client.description}"
            </p>
            <button
              onClick={() => handleDelete(client._id)}
              className="mt-4 flex items-center gap-2 text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;
