import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/AuthContext';
import LoadingOverlay from '@/components/LoadingOverlay'; // Full-page overlay spinner

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { registerUser } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await registerUser({ name, email, password, approved: false });
      setShowModal(true);
    } catch (err) {
      toast.error('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {loading && <LoadingOverlay />}
      <div className="w-full max-w-md p-6 border rounded shadow bg-white text-black z-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            Register
          </button>
        </form>

        {showModal && (
          <div className="mt-6 p-4 border border-yellow-300 bg-yellow-100 text-yellow-800 rounded text-center">
            Registration successful. Waiting for admin approval.
          </div>
        )}

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
