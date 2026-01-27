const GENRE_API_URL = process.env.EXPO_PUBLIC_TMDB_GENRE_API_URL;
const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

export const getGenreDetails = async () => {
  if (!GENRE_API_URL || !TMDB_ACCESS_TOKEN) {
    throw new Error('TMDB API credentials are not configured. Please check your environment variables.');
  }
  try {
    const response = await fetch(GENRE_API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
    }

    const data = await response.json();

    console.log('data',data);
    
    return data?.genres ?? data;
    }
    catch (error: any) {
      if (error instanceof Error) {
        console.error('  - Message:', error.message);
        throw error;
      }
    
      throw new Error('Unknown TMDB error occurred');
    }
}