'use client';

import { useEffect, useState } from 'react';
import { fetchMovies } from '@/lib/tmdb';

export default function TestAPI() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true);
        const test = await fetchMovies('/configuration');
        setResult(test);
        console.log("API test successful:", test);
      } catch (err) {
        setError(err.message);
        console.error("API test failed:", err);
      } finally {
        setLoading(false);
      }
    };
    
    testAPI();
  }, []);

  if (loading) return <div>Testing API connection...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Connection Test</h1>
      <p>✅ API connection successful!</p>
      <details>
        <summary>View Response Data</summary>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </details>
    </div>
  );
}