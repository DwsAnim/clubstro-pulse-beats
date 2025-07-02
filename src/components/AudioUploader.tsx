import React, { useState, useEffect, DragEvent } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface SongData {
  id: number;
  title: string;
  artist: string;
  genre: string;
  image: string;
  url: string;
}

const AudioUploader: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    imageUrl: "",
    songUrl: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [songs, setSongs] = useState<SongData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("trendingSongs");
    if (stored) {
      setSongs(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, type: 'image' | 'audio') => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (type === 'image' && file.type.startsWith("image/")) {
      setImageFile(file);
    } else if (type === 'audio' && (file.type.startsWith("audio/") || file.type.startsWith("video/"))) {
      setAudioFile(file);
    } else {
      toast.error("Unsupported file type.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'audio') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'image' && file.type.startsWith("image/")) {
      setImageFile(file);
    } else if (type === 'audio' && (file.type.startsWith("audio/") || file.type.startsWith("video/"))) {
      setAudioFile(file);
    } else {
      toast.error("Unsupported file type.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, artist, genre, imageUrl, songUrl } = formData;

    if (!title || !artist || !genre) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const fakeUpload = () =>
        new Promise<void>((resolve) => {
          let loaded = 0;
          const interval = setInterval(() => {
            loaded += 10;
            setProgress(Math.min(loaded, 100));
            if (loaded >= 100) {
              clearInterval(interval);
              resolve();
            }
          }, 50);
        });

      await fakeUpload();

      const uploadedUrl = audioFile ? URL.createObjectURL(audioFile) : songUrl;
      const uploadedImage = imageFile ? URL.createObjectURL(imageFile) : imageUrl;

      const newSong: SongData = {
        id: editingId ?? Date.now(),
        title,
        artist,
        genre,
        image: uploadedImage,
        url: uploadedUrl
      };

      let updated: SongData[];

      if (editingId) {
        updated = songs.map(song => song.id === editingId ? newSong : song);
        toast.success("Song updated successfully.");
      } else {
        updated = [...songs, newSong];
        toast.success(`"${newSong.title}" added to trending`);
      }

      localStorage.setItem("trendingSongs", JSON.stringify(updated));
      setSongs(updated);

      setFormData({ title: "", artist: "", genre: "", imageUrl: "", songUrl: "" });
      setImageFile(null);
      setAudioFile(null);
      setEditingId(null);
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleRemoveSong = (id: number) => {
    const updated = songs.filter(song => song.id !== id);
    setSongs(updated);
    localStorage.setItem("trendingSongs", JSON.stringify(updated));
    toast.success("Song removed.");
  };

  const handleEditSong = (song: SongData) => {
    setFormData({
      title: song.title,
      artist: song.artist,
      genre: song.genre,
      imageUrl: song.image.startsWith("blob:") ? "" : song.image,
      songUrl: song.url.startsWith("blob:") ? "" : song.url
    });
    setImageFile(null);
    setAudioFile(null);
    setEditingId(song.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePublishChanges = () => {
    localStorage.setItem("trendingSongs", JSON.stringify(songs));
    toast.success("Changes published.");
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label className="text-white">Song Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-clubstro-dark text-white border-white/10"
          placeholder="Enter Song Title"
          required
        />

        <Label className="text-white">Artist</Label>
        <Input
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="bg-clubstro-dark text-white border-white/10"
          placeholder="Enter Artist Name"
          required
        />

        <Label className="text-white">Genre</Label>
        <Input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="bg-clubstro-dark text-white border-white/10"
          placeholder="Enter Genre"
          required
        />

        <Label className="text-white">Image URL (optional)</Label>
        <Input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="bg-clubstro-dark text-white border-white/10"
        />

        <div
          onDrop={(e) => handleDrop(e, 'image')}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
          className={`p-4 border-2 border-dashed rounded text-center ${
            dragOver ? "border-green-500" : "border-gray-500"
          } text-white`}
        >
          {imageFile ? (
            <p>{imageFile.name}</p>
          ) : (
            <>
              <p>Drop image or</p>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'image')}
              />
              <label htmlFor="image-upload" className="cursor-pointer underline">
                Browse
              </label>
            </>
          )}
        </div>

        <Label className="text-white">Song URL (optional)</Label>
        <Input
          name="songUrl"
          value={formData.songUrl}
          onChange={handleChange}
          placeholder="https://example.com/song.mp3"
          className="bg-clubstro-dark text-white border-white/10"
        />

        <div
          onDrop={(e) => handleDrop(e, 'audio')}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
          className={`p-4 border-2 border-dashed rounded text-center ${
            dragOver ? "border-green-500" : "border-gray-500"
          } text-white`}
        >
          {audioFile ? (
            <p>{audioFile.name}</p>
          ) : (
            <>
              <p>Drop audio/video file or</p>
              <input
                type="file"
                accept="audio/*,video/*"
                id="audio-upload"
                className="hidden"
                onChange={(e) => handleFileChange(e, 'audio')}
              />
              <label htmlFor="audio-upload" className="cursor-pointer underline">
                Browse
              </label>
            </>
          )}
        </div>

        {loading && (
          <div className="text-white">
            Uploading: {progress}%
            <div className="w-full bg-gray-300 rounded">
              <div
                className="bg-green-500 p-1 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <Button
          disabled={loading}
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Upload className="h-4 w-4 mr-2" />
          {editingId ? "Update Song" : loading ? "Uploading…" : "Submit"}
        </Button>
      </form>

      {/* Trending Songs Section */}
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
                    <TableCell className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditSong(song)}
                        className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10 p-1 h-auto"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveSong(song.id)}
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
  );
};

export default AudioUploader;
