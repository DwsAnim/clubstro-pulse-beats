// src/services/api.ts
import axios from 'axios';

const API_BASE = 'https://clubstro-main-ul3lnd.laravel.cloud/api/v1';

const api = axios.create({ baseURL: API_BASE });

// Attach token and content-type automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data && !(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// ✅ Login API (already used)
export async function loginAPI(email: string, password: string) {
  const res = await api.post('/app/auth/login', { email, password });
  return res.data;
}

// ✅ Register API (newly used again)
export async function registerAPI(name: string, email: string, password: string) {
  const res = await api.post('/app/auth/register', { name, email, password });
  return res.data;
}

// Optional: File uploader (used if you keep it)
export async function uploadFileAPI(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/app/uploads', formData);
  return res.data;
}

export default api;
