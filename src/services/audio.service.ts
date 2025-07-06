import api from "@/services/api";

export async function uploadAudio(
  formData: {
    title: string;
    artists: string;
    genres: string;
    imageUrl?: string;
    songUrl?: string;
    imageFile?: File | null;
    audioFile?: File | null;
  }
) {
  const data = new FormData();
  data.append("title", formData.title);
  data.append("artists", formData.artists);
  data.append("genres", formData.genres);

  if (formData.imageFile) {
    data.append("image_url", formData.imageFile); // File takes priority
  } else if (formData.imageUrl) {
    data.append("image_url", formData.imageUrl); // Use provided URL if no file
  }

  if (formData.audioFile) {
    data.append("song_url", formData.audioFile);
  } else if (formData.songUrl) {
    data.append("song_url", formData.songUrl);
  }

  const response = await api.post("/app/admin/create-trending-song", data);
  return response.data;
}
