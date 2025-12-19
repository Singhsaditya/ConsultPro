import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import API_BASE from '../../api';

function Newsletter() {
  const [subscribers, setSubscribers] = useState([]);

  // FETCH SUBSCRIBERS
  useEffect(() => {
    fetch(`${API_BASE}/subscribers`)
      .then(res => res.json())
      .then(data => setSubscribers(data));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Newsletter Subscribers
        </h1>
        <p className="text-gray-600 mt-2">
          View all newsletter subscriptions
        </p>
      </div>

      {/* SUMMARY CARD */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Total Subscribers</p>
          <p className="text-3xl font-bold text-gray-800">
            {subscribers.length}
          </p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg">
          <Mail className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* SUBSCRIBERS TABLE */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Subscriber List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Email Address
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">
                  Subscribed On
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr
                  key={subscriber._id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4">{subscriber.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {subscribers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No subscribers yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
