import api from '@/services/api';

export async function login(email: string, password: string) {
  const response = await api.post('/app/auth/login', { email, password });
  const { token } = response.data;

  if (token) {
    localStorage.setItem('token', token);
  }

  return token;
}
