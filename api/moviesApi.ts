const RAPIDAPI_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.EXPO_PUBLIC_RAPIDAPI_HOST;
const RAPIDAPI_URL = process.env.EXPO_PUBLIC_RAPIDAPI_URL;

export const getMovieDetails = async () => {
  try {
    console.log('Fetching from URL:', RAPIDAPI_URL);
    
    const response = await fetch(RAPIDAPI_URL!, {
      method: "GET",
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST!,
        'x-rapidapi-key': RAPIDAPI_KEY!,
        
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('API Response:', result);
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
