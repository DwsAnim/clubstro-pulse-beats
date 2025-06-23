import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/components/AuthContext";
import LoadingOverlay from "@/components/LoadingOverlay";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/upload";

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful.");
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050c1b] text-white p-4 relative">
      {loading && <LoadingOverlay />}
      <div className="bg-[#0c1a2e] w-full max-w-md p-6 rounded-lg shadow-lg z-10">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded bg-white text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded bg-white text-black"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
