import api from '@/services/api';

interface RankingParams {
  top: string;
  frequency: string;
  state: string;
  type: string;
}

export async function getRankings(params: RankingParams) {
  try {
    const response = await api.get('/app/rankings', {
      params: {
        'filter[top]': params.top,
        'filter[frequency]': params.frequency,
        'filter[state]': params.state,
        'filter[type]': params.type,
      },
    });
    console.log('getRankings response:', response);
    return response.data;
  } catch (err: any) {
    console.error('getRankings error:', err.response || err);
    throw err;
  }
}
