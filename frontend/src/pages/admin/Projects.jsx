import { useEffect, useState } from 'react';
import { Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import API_BASE from '../../api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  // FETCH PROJECTS
  
  const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    const data = await res.json();
    setProjects(data);
  } catch (error) {
    console.error("Failed to fetch projects");
  }
};

useEffect(() => {
  fetchProjects();
}, []);
 
  // ADD PROJECT
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.description || !formData.image) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to add project");
    }

    setFormData({ name: "", description: "", image: "" });

    // 🔥 IMPORTANT: refetch projects from DB
    fetchProjects();

    alert("Project added successfully");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};


  // DELETE PROJECT
  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
    });

    setProjects(projects.filter(p => p._id !== id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Projects Management</h1>
        <p className="text-gray-600 mt-2">Add and manage your consulting projects</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Add New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Project Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            placeholder="Project Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />

          <textarea
            placeholder="Project Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg"
            rows={4}
            required
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="border rounded-lg overflow-hidden">
            <img src={project.image} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{project.description}</p>
              <button
                onClick={() => handleDelete(project._id)}
                className="mt-4 flex items-center gap-2 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
