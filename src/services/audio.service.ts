import api from '@/services/api';

export async function uploadAudio(file: File, club_name: string, address: string) {
  const formData = new FormData();
  formData.append('audio', file);
  formData.append('club_name', club_name);
  formData.append('address', address);

  const response = await api.post('/app/admin/audio-clip', formData);
  return response.data;
}
