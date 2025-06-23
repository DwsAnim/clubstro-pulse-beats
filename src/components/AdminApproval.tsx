import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthContext';

const allowedAdminEmails = ['roland@clubstro.com', 'jacendubuisi6@gmail.com'];

const AdminApproval: React.FC = () => {
  const { user, pendingUsers, approveUser, rejectUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !allowedAdminEmails.includes(user.email)) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !allowedAdminEmails.includes(user.email)) {
    return null; // Prevent flashing before redirect
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Pending User Approvals</h2>
      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <ul className="space-y-4">
          {pendingUsers.map((pendingUser) => (
            <li
              key={pendingUser.email}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{pendingUser.name}</p>
                <p className="text-sm text-gray-600">{pendingUser.email}</p>
              </div>
              {pendingUser.approved ? (
                <span className="text-green-600 font-semibold">Approved</span>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={() => approveUser(pendingUser.email)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => rejectUser(pendingUser.email)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminApproval;
