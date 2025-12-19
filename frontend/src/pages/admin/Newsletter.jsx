import { useEffect, useState } from 'react';
import API_BASE from '../../api';

function Newsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH SUBSCRIBERS FROM BACKEND
  useEffect(() => {
    fetch(`${API_BASE}/subscribers`)
      .then((res) => res.json())
      .then((data) => {
        setSubscribers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Newsletter Subscribers
        </h1>
        <p className="text-gray-600 mt-2">
          Emails collected from the landing page newsletter form
        </p>
      </div>

      {loading && (
        <p className="text-gray-500">Loading subscribers...</p>
      )}

      {!loading && subscribers.length === 0 && (
        <p className="text-gray-500">No subscribers yet.</p>
      )}

      {!loading && subscribers.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  #
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Subscribed On
                </th>
              </tr>
            </thead>

            <tbody>
              {subscribers.map((sub, index) => (
                <tr
                  key={sub._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6 text-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {sub.email}
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Newsletter;
