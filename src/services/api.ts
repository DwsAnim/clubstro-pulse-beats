// src/services/api.ts
import axios from 'axios';

const API_BASE = 'https://clubstro-main-ul3lnd.laravel.cloud/api/v1';

const api = axios.create({ baseURL: API_BASE });

// ✅ Automatically attach token and content-type
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ Only set Content-Type if not FormData (Axios handles FormData automatically)
  if (
    config.data &&
    typeof config.data === 'object' &&
    !(config.data instanceof FormData)
  ) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// ✅ Login
export async function loginAPI(email: string, password: string) {
  const res = await api.post('/app/auth/login', { email, password });
  return res.data;
}

// ✅ Register
export async function registerAPI(name: string, email: string, password: string) {
  const res = await api.post('/app/auth/register', { name, email, password });
  return res.data;
}

// ✅ Upload File (optional generic upload endpoint)
export async function uploadFileAPI(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/app/uploads', formData);
  return res.data;
}

// ✅ Upload a trending song (used in AudioUploader now)
export async function uploadTrendingSong(data: {
  title: string;
  artists: string;
  genres: string;
  image_url: string;
  song_url: string;
}) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('artists', data.artists);
  formData.append('genres', data.genres);
  formData.append('image_url', data.image_url); // Can be a URL or filename from upload
  formData.append('song_url', data.song_url);   // Can be a URL or filename from upload

  const res = await api.post('/app/admin/create-trending-song', formData);
  return res.data;
}

export default api;
