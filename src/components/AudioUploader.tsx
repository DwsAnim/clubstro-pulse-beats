import React, { useState, useEffect, DragEvent } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/services/api";

interface SongData {
  id: number;
  title: string;
  artist: string;
  genre: string;
  image_url: string;
  song_url: string;
}

const AudioUploader: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    imageUrl: "",
    songUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<SongData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await api.get("/app/admin/trending-songs");
      setSongs(res.data);
    } catch (err) {
      toast.error("Failed to load trending songs");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, type: "image" | "audio") => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (type === "image" && file.type.startsWith("image/")) setImageFile(file);
    else if (type === "audio" && file.type.startsWith("audio/")) setAudioFile(file);
    else toast.error("Unsupported file type.");
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "audio"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const maxSize = 10 * 1024 * 1024; // 10MB limit
    if (file.size > maxSize) {
      toast.error("File is too large. Max 10MB.");
      return;
    }
    if (type === "image" && file.type.startsWith("image/")) setImageFile(file);
    else if (type === "audio" && file.type.startsWith("audio/")) setAudioFile(file);
    else toast.error("Unsupported file type.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, artist, genre, imageUrl, songUrl } = formData;
    if (!title || !artist || !genre) {
      toast.error("Please fill all required fields.");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("artists", artist);
    form.append("genres", genre);
    if (imageFile) form.append("image_url", imageFile);
    else form.append("image_url", imageUrl);
    if (audioFile) form.append("song_url", audioFile);
    else form.append("song_url", songUrl);

    try {
      setLoading(true);
      setProgress(0);
      const config = {
        onUploadProgress: (event: ProgressEvent) => {
          const percent = Math.round((event.loaded * 100) / (event.total || 1));
          setProgress(percent);
        },
      };

      await api.post("/app/admin/create-trending-song", form, config);
      toast.success(editingId ? "Song updated" : "Song uploaded successfully");

      setFormData({ title: "", artist: "", genre: "", imageUrl: "", songUrl: "" });
      setImageFile(null);
      setAudioFile(null);
      setEditingId(null);
      fetchSongs();
    } catch (err) {
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleRemoveSong = async (id: number) => {
    try {
      await api.delete(`/app/admin/trending-songs/${id}`);
      setSongs((prev) => prev.filter((song) => song.id !== id));
      toast.success("Song removed.");
    } catch (err) {
      toast.error("Failed to remove song.");
    }
  };

  const handleEditSong = (song: SongData) => {
    setFormData({
      title: song.title,
      artist: song.artist,
      genre: song.genre,
      imageUrl: song.image_url,
      songUrl: song.song_url,
    });
    setEditingId(song.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label className="text-white">Song Title</Label>
        <Input name="title" value={formData.title} onChange={handleChange} required />

        <Label className="text-white">Artist</Label>
        <Input name="artist" value={formData.artist} onChange={handleChange} required />

        <Label className="text-white">Genre</Label>
        <Input name="genre" value={formData.genre} onChange={handleChange} required />

        <Label className="text-white">Image URL (optional)</Label>
        <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
        {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-32 h-32 object-cover" />}

        <div onDrop={(e) => handleDrop(e, "image")} onDragOver={(e) => e.preventDefault()} className="border p-2 text-white">
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} />
        </div>

        <Label className="text-white">Song URL (optional)</Label>
        <Input name="songUrl" value={formData.songUrl} onChange={handleChange} />
        {audioFile && <audio controls src={URL.createObjectURL(audioFile)} className="mt-2" />}

        <div onDrop={(e) => handleDrop(e, "audio")} onDragOver={(e) => e.preventDefault()} className="border p-2 text-white">
          <input type="file" accept="audio/*" onChange={(e) => handleFileChange(e, "audio")} />
        </div>

        {loading && (
          <div className="text-white">
            Uploading: {progress}%
            <div className="w-full bg-gray-300 rounded">
              <div className="bg-green-500 h-2 rounded" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <Button disabled={loading} type="submit" className="w-full">
          <Upload className="h-4 w-4 mr-2" />
          {editingId ? "Update Song" : loading ? "Uploading…" : "Submit"}
        </Button>
      </form>

      <div>
        <h3 className="text-white mb-4">Trending Songs</h3>
        {songs.length === 0 ? (
          <p className="text-gray-400">No songs available.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Artist</TableHead>
                <TableHead className="text-white">Genre</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {songs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell className="text-white">{song.title}</TableCell>
                  <TableCell className="text-white">{song.artist}</TableCell>
                  <TableCell className="text-white">{song.genre}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditSong(song)} className="text-yellow-500">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveSong(song.id)} className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AudioUploader;
