
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Simple auth check
  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-clubstro-dark-gray p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 p-4 bg-clubstro-dark rounded-lg border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Club<span className="text-clubstro-blue">stro</span> Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage your music platform</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-white hover:bg-white/10"
          >
            Logout
          </Button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-clubstro-dark p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Welcome to Admin Panel</h2>
            <p className="text-gray-400">
              This is a placeholder dashboard. In a real application, you would see analytics,
              content management options, and other administrative tools here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
