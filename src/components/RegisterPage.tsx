// src/components/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/AuthContext';
import LoadingOverlay from '@/components/LoadingOverlay';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
      await registerUser({ name, email, password });
      toast.success('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050c1b] text-white p-4 relative">
      {loading && <LoadingOverlay />}
      <div className="bg-[#0c1a2e] w-full max-w-md p-6 rounded-lg shadow-lg z-10">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-white text-black"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-white text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-white text-black"
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

        <p className="mt-4 text-sm text-center text-gray-300">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
