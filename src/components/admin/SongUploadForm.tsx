
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SongFormData {
  id?: number;
  title: string;
  artist: string;
  genre: string;
  image: string;
  url?: string;
}

const SongUploadForm = () => {
  const { toast } = useToast();
  const [songs, setSongs] = useState<SongFormData[]>([]);
  const [formData, setFormData] = useState<SongFormData>({
    title: '',
    artist: '',
    genre: '',
    image: '',
    url: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddSong = () => {
    // Basic validation
    if (!formData.title || !formData.artist || !formData.genre || !formData.image) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const newSong = {
      ...formData,
      id: Date.now() // Simple unique ID
    };
    
    // Add song to the list
    setSongs(prev => [...prev, newSong]);
    
    // Reset form
    setFormData({
      title: '',
      artist: '',
      genre: '',
      image: '',
      url: ''
    });
    
    // Show success message
    toast({
      title: "Song added",
      description: `"${newSong.title}" by ${newSong.artist} added successfully`
    });
    
    // In a real app, this would save to a backend/database
    const updatedSongs = [...songs, newSong];
    localStorage.setItem('trendingSongs', JSON.stringify(updatedSongs));
  };
  
  const handleRemoveSong = (id: number) => {
    setSongs(prev => prev.filter(song => song.id !== id));
    toast({
      title: "Song removed",
      description: "The song has been removed from trending songs"
    });
    
    // Update local storage
    const updatedSongs = songs.filter(song => song.id !== id);
    localStorage.setItem('trendingSongs', JSON.stringify(updatedSongs));
  };
  
  const handlePublishChanges = () => {
    // In a real app, this would send to a backend API
    localStorage.setItem('trendingSongs', JSON.stringify(songs));
    toast({
      title: "Changes published",
      description: `${songs.length} songs are now live in the trending section`
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-clubstro-light-gray p-4 rounded-lg">
          <h3 className="font-medium text-white">Add New Song</h3>
          
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Song Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter song title"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="artist" className="text-white">Artist</Label>
            <Input
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="genre" className="text-white">Genre</Label>
            <Input
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Enter genre"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image" className="text-white">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url" className="text-white">Song URL (optional)</Label>
            <Input
              id="url"
              name="url"
              value={formData.url || ''}
              onChange={handleChange}
              placeholder="https://example.com/song.mp3"
              className="bg-clubstro-dark border-white/10 text-white"
            />
          </div>
          
          <Button onClick={handleAddSong} className="w-full bg-clubstro-blue hover:bg-clubstro-blue/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Song
          </Button>
        </div>
        
        <div className="bg-clubstro-light-gray p-4 rounded-lg overflow-hidden">
          <h3 className="font-medium text-white mb-4">Current Trending Songs</h3>
          
          {songs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No songs added yet. Add some songs to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">Artist</TableHead>
                    <TableHead className="text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {songs.map((song) => (
                    <TableRow key={song.id}>
                      <TableCell className="font-medium text-white">{song.title}</TableCell>
                      <TableCell className="text-white">{song.artist}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveSong(song.id!)} 
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-1 h-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <Button 
            onClick={handlePublishChanges} 
            disabled={songs.length === 0} 
            className="w-full mt-4 bg-clubstro-blue hover:bg-clubstro-blue/90"
          >
            <Upload className="h-4 w-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SongUploadForm;
