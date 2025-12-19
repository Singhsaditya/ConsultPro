import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, User } from 'lucide-react';
import API_BASE from '../../api';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  // FETCH CONTACTS
  useEffect(() => {
    fetch(`${API_BASE}/contacts`)
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Contact Submissions</h1>
        <p className="text-gray-600 mt-2">
          View all contact form submissions from the landing page
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b flex justify-between">
          <h2 className="text-xl font-bold">All Contacts</h2>
          <span className="text-sm text-gray-600">
            Total: {contacts.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Mobile</th>
                <th className="px-6 py-4 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr
                  key={contact._id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4">{contact.fullName}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.mobile}</td>
                  <td className="px-6 py-4">{contact.city}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {contacts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No contact submissions yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
