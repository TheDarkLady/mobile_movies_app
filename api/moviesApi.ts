const TMDBAPI_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN;
const TMDBAPI_URL = process.env.EXPO_PUBLIC_TMDB_API_URL;

export const getMovieDetails = async () => {
  try {
    console.log('=== TMDB API Debug ===');
    console.log('API URL:', TMDBAPI_URL);
    console.log('API Key:', TMDBAPI_KEY);
    console.log('Access Token:', TMDB_ACCESS_TOKEN ? 'Exists' : 'Missing');
    
    if (!TMDBAPI_URL) {
      throw new Error('TMDB API URL is undefined. Check your .env file.');
    }
    
    if (!TMDB_ACCESS_TOKEN) {
      throw new Error('TMDB Access Token is undefined. Check your .env file.');
    }
    
    const response = await fetch(TMDBAPI_URL, {
      method: "GET",
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('API Response:', result);
    
    // TMDB returns movies in a 'results' array
    return result.results || result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
