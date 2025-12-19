import { useEffect, useState } from 'react';
import API_BASE from '../../api';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/contacts`)
      .then(res => res.json())
      .then(setContacts);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>

      {contacts.map(c => (
        <div key={c._id} className="border p-4 rounded mb-3">
          <p><b>{c.fullName}</b> ({c.city})</p>
          <p>{c.email} | {c.mobile}</p>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
