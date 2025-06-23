import React, { useState, DragEvent } from "react";
import api from "@/services/api";
import { toast } from "react-toastify";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

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

  const { user } = useAuth();
  const navigate = useNavigate();

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

    if (!title || !artist || !genre || (!imageUrl && !imageFile) || (!songUrl && !audioFile)) {
      toast.error("Please fill all required fields or upload files.");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("artist", artist);
      data.append("genre", genre);
      if (imageFile) data.append("image", imageFile);
      else data.append("imageUrl", imageUrl);

      if (audioFile) data.append("audio", audioFile);
      else data.append("songUrl", songUrl);

      await api.post("/app/admin/audio-clip", data, {
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        }
      });

      toast.success("Song uploaded successfully!");
      setFormData({ title: "", artist: "", genre: "", imageUrl: "", songUrl: "" });
      setImageFile(null);
      setAudioFile(null);
    } catch (err) {
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Label className="text-white">Song Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="bg-clubstro-dark text-white border-white/10"
          required
        />

        <Label className="text-white">Artist</Label>
        <Input
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="bg-clubstro-dark text-white border-white/10"
          required
        />

        <Label className="text-white">Genre</Label>
        <Input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="bg-clubstro-dark text-white border-white/10"
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
          {loading ? "Uploading…" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default AudioUploader;
