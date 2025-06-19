
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mock authentication - in a real app, you would check credentials against a backend
    setTimeout(() => {
      // For demo purposes we'll accept "admin" as username and "clubstro2025" as password
      if (username === 'admin' && password === 'clubstro2025') {
        toast({
          title: "Login successful",
          description: "Welcome to the admin portal!",
        });
        // In a real app, you'd store auth token in localStorage/sessionStorage
        localStorage.setItem('adminAuth', 'true');
        navigate('/portal');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-clubstro-dark-gray p-4">
      <Card className="w-full max-w-md bg-clubstro-dark border border-white/10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-3xl font-bold text-white">
              Club<span className="text-clubstro-blue">stro</span>
            </span>
          </div>
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access the admin portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <User size={16} />
                </div>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-white/10 pt-4">
          <p className="text-gray-400 text-sm">
            Clubstro Admin Portal
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
