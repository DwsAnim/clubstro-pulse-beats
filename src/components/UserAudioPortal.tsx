import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Music, Upload, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import AudioUploader from "@/components/AudioUploader";

const UserAudioPortal = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-clubstro-dark-gray p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 p-4 bg-clubstro-dark rounded-lg border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Club<span className="text-clubstro-blue">stro</span> Upload Center
            </h1>
            <p className="text-gray-400">Welcome, {user?.name}</p>
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
                <Upload className="h-5 w-5 mr-2" />
                Upload Music Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="audio" className="w-full">
                <TabsList className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 bg-clubstro-light-gray mb-4">
                  <TabsTrigger value="audio" className="text-white data-[state=active]:bg-clubstro-blue">
                    <Music className="h-4 w-4 mr-2" />
                    Upload Audio
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="audio" className="bg-clubstro-dark p-4 rounded-lg border border-white/10">
                  <AudioUploader />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserAudioPortal;
