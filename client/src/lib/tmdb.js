const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(endpoint = "/movie/popular", params = {}, retries = 3) {
  // ✅ CORRECTED: API_KEY (not APL_KEY)
  if (!API_KEY || API_KEY === "undefined") {
    throw new Error("TMDB API key is not configured");
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY); // ✅ Correct
  url.searchParams.append("include_adult", "false");

  for (const key in params) {
    url.searchParams.set(key, params[key]);
  }

  console.log("Fetch URL:", url.toString());

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status >= 500 && retries > 0) {
        console.log(`Retrying... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchMovies(endpoint, params, retries - 1);
      }
      
      throw new Error(`Failed to fetch movies: ${res.status} ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    if (retries > 0 && error.message.includes('Failed to fetch')) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchMovies(endpoint, params, retries - 1);
    }
    
    throw new Error(`Network error: ${error.message}`);
  }
}

// ✅ ADD THIS FUNCTION - Fetch movie videos/trailers
export async function fetchMovieVideos(movieId, retries = 3) {
  if (!API_KEY || API_KEY === "undefined") {
    throw new Error("TMDB API key is not configured");
  }

  const url = new URL(`${BASE_URL}/movie/${movieId}/videos`);
  url.searchParams.set("api_key", API_KEY);

  console.log("Fetch Videos URL:", url.toString());

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status >= 500 && retries > 0) {
        console.log(`Retrying... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchMovieVideos(movieId, retries - 1);
      }
      
      throw new Error(`Failed to fetch videos: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    if (retries > 0 && error.message.includes('Failed to fetch')) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchMovieVideos(movieId, retries - 1);
    }
    
    throw new Error(`Network error: ${error.message}`);
  }
}

export async function searchMovies(query) {
  return fetchMovies("/search/movie", { query });
}