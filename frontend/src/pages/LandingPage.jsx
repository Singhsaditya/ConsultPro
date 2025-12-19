import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE from '../api';

function LandingPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');

  /* =======================
     FETCH PROJECTS & CLIENTS
     ======================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await fetch(`${API_BASE}/projects`);
        const clientsRes = await fetch(`${API_BASE}/clients`);

        const projectsData = await projectsRes.json();
        const clientsData = await clientsRes.json();

        setProjects(projectsData);
        setClients(clientsData);
      } catch (error) {
        console.error('Failed to load landing page data', error);
      }
    };

    fetchData();
  }, []);

  /* =======================
     CONTACT FORM SUBMIT
     ======================= */
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      alert('Contact submitted successfully!');
      setContactForm({ fullName: '', email: '', mobile: '', city: '' });
    } catch {
      alert('Failed to submit contact form');
    }
  };

  /* =======================
     NEWSLETTER SUBMIT
     ======================= */
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_BASE}/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      alert('Subscribed successfully!');
      setNewsletterEmail('');
    } catch {
      alert('Subscription failed');
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 shadow-sm bg-white sticky top-0 z-40">
        <span className="text-2xl font-bold text-gray-800">ConsultPro</span>
      </header>

      {/* ADMIN PANEL BUTTON */}
      <button
        onClick={() => navigate('/admin')}
        className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition z-50"
      >
        Admin Panel
      </button>

      {/* HERO + CONTACT */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Transform Your Business with Expert Consulting
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              We help organizations drive growth, optimize operations, and achieve long-term success.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 text-gray-800 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input
                placeholder="Full Name"
                value={contactForm.fullName}
                onChange={(e) =>
                  setContactForm({ ...contactForm, fullName: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                placeholder="Email"
                type="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                placeholder="Mobile Number"
                value={contactForm.mobile}
                onChange={(e) =>
                  setContactForm({ ...contactForm, mobile: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />
              <input
                placeholder="City"
                value={contactForm.city}
                onChange={(e) =>
                  setContactForm({ ...contactForm, city: e.target.value })
                }
                className="w-full p-3 border rounded-lg"
                required
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* OUR PROJECTS */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Projects</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="bg-white shadow rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No projects available
              </p>
            )}
          </div>
        </div>
      </section>

      {/* HAPPY CLIENTS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Happy Clients</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {clients.length > 0 ? (
              clients.map((client) => (
                <div key={client._id} className="p-6 shadow rounded-lg">
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
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No client testimonials yet
              </p>
            )}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Subscribe to our newsletter for the latest insights and updates.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
            <input
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              className="flex-1 p-3 rounded text-black"
              required
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;
