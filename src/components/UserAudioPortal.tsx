import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Music, Upload, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthContext";
import AudioUploader from "@/components/AudioUploader";
import { useToast } from "@/hooks/use-toast";

const UserAudioPortal = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const { toast } = useToast();

  const [showTrendingSongs, setShowTrendingSongs] = useState(true);

  // Ensure user is authenticated
  useEffect(() => {
    if (loading) return; // wait for auth to finish
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const savedToggle = localStorage.getItem("showTrendingSongs");
    if (savedToggle !== null) {
      setShowTrendingSongs(savedToggle === "true");
    }
  }, []);

  const handleToggleTrendingSongs = (checked: boolean) => {
    setShowTrendingSongs(checked);
    localStorage.setItem("showTrendingSongs", checked.toString());

    toast({
      title: checked ? "Trending Songs Enabled" : "Trending Songs Disabled",
      description: checked
        ? "Trending songs are now visible on the homepage."
        : "Trending songs are now hidden from users."
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-clubstro-dark-gray text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-clubstro-dark-gray p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Toggle Trending Chart */}
        <Card className="bg-clubstro-dark border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Music className="h-5 w-5 mr-2" />
              Trending Chart Visibility
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
                Show Trending Songs Chart
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Upload Audio */}
        <Card className="bg-clubstro-dark border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Music Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="audio" className="w-full">
              <TabsList className="grid grid-cols-1 bg-clubstro-light-gray mb-4">
                <TabsTrigger
                  value="audio"
                  className="text-white data-[state=active]:bg-clubstro-blue"
                >
                  <Music className="h-4 w-4 mr-2" />
                  Upload Audio
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="audio"
                className="bg-clubstro-dark p-4 rounded-lg border border-white/10"
              >
                <AudioUploader />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAudioPortal;
