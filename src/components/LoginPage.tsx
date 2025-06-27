import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/components/AuthContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-clubstro-dark-gray p-4 relative">
      {loading && <LoadingOverlay />}

      <Card className="w-full max-w-md bg-clubstro-dark border border-white/10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-3xl font-bold text-white">
              Club<span className="text-clubstro-blue">stro</span>
            </span>
          </div>
          <CardTitle className="text-2xl text-white">User Login</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to access your upload portal
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Mail size={16} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2 border-t border-white/10 pt-4">
          <p className="text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
          <p className="text-gray-500 text-xs">Clubstro Music Portal</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
