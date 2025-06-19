
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import SongUploadForm from "@/components/admin/SongUploadForm";
import EventUploadForm from "@/components/admin/EventUploadForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Music, Calendar } from "lucide-react";

const AdminPortal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTrendingSongs, setShowTrendingSongs] = useState(true);

  // Auth check
  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleToggleTrendingSongs = (checked: boolean) => {
    setShowTrendingSongs(checked);
    localStorage.setItem('showTrendingSongs', checked.toString());
    
    toast({
      title: checked ? "Trending Songs Enabled" : "Trending Songs Disabled",
      description: checked 
        ? "The trending songs widget is now visible to users." 
        : "The trending songs widget is now hidden from users.",
    });
  };

  return (
    <div className="min-h-screen bg-clubstro-dark-gray p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 p-4 bg-clubstro-dark rounded-lg border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Club<span className="text-clubstro-blue">stro</span> Admin Portal
            </h1>
            <p className="text-gray-400">Manage your music platform</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-clubstro-dark border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Music className="h-5 w-5 mr-2" />
                Content Visibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="trending-songs-switch" 
                  checked={showTrendingSongs}
                  onCheckedChange={handleToggleTrendingSongs}
                />
                <Label htmlFor="trending-songs-switch" className="text-white">
                  Show Trending Songs Widget
                </Label>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-clubstro-light-gray">
              <TabsTrigger value="songs" className="text-white data-[state=active]:bg-clubstro-blue">
                <Music className="h-4 w-4 mr-2" />
                Manage Songs
              </TabsTrigger>
              <TabsTrigger value="events" className="text-white data-[state=active]:bg-clubstro-blue">
                <Calendar className="h-4 w-4 mr-2" />
                Manage Events
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="songs" className="bg-clubstro-dark p-4 rounded-lg border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Upload Trending Songs</h2>
              <SongUploadForm />
            </TabsContent>
            
            <TabsContent value="events" className="bg-clubstro-dark p-4 rounded-lg border border-white/10">
              <h2 className="text-xl font-bold text-white mb-4">Create Events</h2>
              <EventUploadForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
