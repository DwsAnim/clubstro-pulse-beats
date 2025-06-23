import React, { useState, DragEvent } from "react";
import api from "@/services/api";
import { toast } from "react-toastify";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";

const AudioUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [clubName, setClubName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const APPROVER_EMAILS = ['roland@clubstro.com', 'jacendubuisi6@gmail.com'];
  const isApproverAdmin = user && APPROVER_EMAILS.includes(user.email);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Max 10MB.");
      return;
    }
    if (!selectedFile.type.startsWith("audio/")) {
      toast.error("Invalid file format.");
      return;
    }
    setFile(selectedFile);
    setError(null);
    setSuccess(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    if (!clubName.trim()) {
      toast.error("Please enter a club name.");
      return;
    }
    if (!address.trim()) {
      toast.error("Please enter an address.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("audio", file);
      formData.append("club_name", clubName);
      formData.append("address", address);

      await api.post("/app/admin/audio-clip", formData, {
        onUploadProgress: (e) => {
          if (e.total) {
            setProgress(Math.round((e.loaded * 100) / e.total));
          }
        },
      });

      setSuccess("File uploaded successfully!");
      toast.success("File uploaded successfully!");
      setFile(null);
      setClubName("");
      setAddress("");
    } catch (err) {
      setError("Failed to upload.");
      toast.error("File upload failed.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="p-4 relative">
      {isApproverAdmin && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/admin-approval")}
            className="p-2 w-full max-w-xs bg-green-500 text-white font-semibold rounded hover:bg-green-600"
          >
            Approve Users
          </button>
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-4">Upload Audio</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Club Name"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          required
          className="mb-2 p-2 border rounded w-full text-black"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="mb-2 p-2 border rounded w-full text-black"
        />

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mb-2 p-4 border-2 border-dashed rounded text-center ${
            dragOver ? "border-green-500" : "border-gray-500"
          }`}
        >
          {file ? (
            <div>
              <p>Selected: {file.name}</p>
              <audio controls src={URL.createObjectURL(file)} />
            </div>
          ) : (
            <div>
              <p>Drag & drop audio here or click to select</p>
              <input
                id="fileinput"
                type="file"
                onChange={handleFileChange}
                accept="audio/*"
                required
                className="hidden"
              />
              <label
                htmlFor="fileinput"
                className="p-2 mt-2 block bg-gray-200 rounded cursor-pointer text-black"
              >
                Browse files
              </label>
            </div>
          )}
        </div>

        {loading && (
          <div className="mb-2">
            <p>Uploading: {progress}%</p>
            <div className="w-full bg-gray-200 rounded text-black">
              <div
                className="bg-green-500 p-1 rounded text-black"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="p-2 w-full bg-green-500 text-white font-semibold rounded disabled:opacity-50"
        >
          {loading ? "Uploading…" : "Submit"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default AudioUploader;
