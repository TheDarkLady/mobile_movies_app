const TMDB_API_URL = process.env.EXPO_PUBLIC_TMDB_API_URL;
const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;

export const getMovieDetails = async ({query = ''}: {query?: string} = {}) => {
  const endpoint = query ? `${TMDB_API_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_API_URL}/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc`;
  if (!TMDB_API_URL || !TMDB_ACCESS_TOKEN) {
    throw new Error('TMDB API credentials are not configured. Please check your environment variables.');
  }
  try {

    const response = await fetch(endpoint, {
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

    return data?.results ?? data;
  } catch (error: any) {

    if (error instanceof Error) {
      console.error('  - Message:', error.message);
      throw error;
    }

    throw new Error('Unknown TMDB error occurred');
  }
};

export const getMovieById = async (movieId: string | number) => {
  const endpoint = `${TMDB_API_URL}/movie/${movieId}?language=en-US`;
  
  if (!TMDB_API_URL || !TMDB_ACCESS_TOKEN) {
    throw new Error('TMDB API credentials are not configured. Please check your environment variables.');
  }
  
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error Response:', errorText);
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('  - Message:', error.message);
      throw error;
    }
    throw new Error('Unknown TMDB error occurred');
  }
};
