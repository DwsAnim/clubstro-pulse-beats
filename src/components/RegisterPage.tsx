import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/components/AuthContext';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, Mail, User } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-clubstro-dark-gray p-4 relative">
      {loading && <LoadingOverlay />}

      <Card className="w-full max-w-md bg-clubstro-dark border border-white/10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-3xl font-bold text-white">
              Club<span className="text-clubstro-blue">stro</span>
            </span>
          </div>
          <CardTitle className="text-2xl text-white">Create Account</CardTitle>
          <CardDescription className="text-gray-400">
            Join the platform and start uploading music
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <User size={16} />
                </div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 bg-clubstro-light-gray border-white/10 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Mail size={16} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 bg-clubstro-light-gray border-white/10 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Lock size={16} />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 bg-clubstro-light-gray border-white/10 text-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-clubstro-blue hover:bg-clubstro-blue/90"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2 border-t border-white/10 pt-4">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-400 hover:underline"
            >
              Login
            </button>
          </p>
          <p className="text-gray-500 text-xs">Clubstro Music Portal</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
