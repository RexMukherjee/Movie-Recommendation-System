"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMovies, fetchMovieVideos } from '@/lib/tmdb';
import styles from './page.module.css';

export default function WatchPage() {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        const [movieData, videos] = await Promise.all([
          fetchMovies(`/movie/${movieId}`),
          fetchMovieVideos(movieId)
        ]);

        setMovie(movieData);
        
        // Find YouTube trailer
        const youtubeTrailer = videos.find(video => 
          video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(youtubeTrailer);

      } catch (error) {
        console.error('Error loading movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      loadMovieData();
    }
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!movie) return <div className={styles.error}>Movie not found</div>;

  return (
    <div className={styles.container}>
      {/* Movie Trailer */}
      {trailer ? (
        <div className={styles.trailerSection}>
          <h1>{movie.title} - Trailer</h1>
          <div className={styles.videoContainer}>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : (
        <div className={styles.noTrailer}>
          <h1>{movie.title}</h1>
          <p>No trailer available for this movie.</p>
        </div>
      )}

      {/* Movie Details */}
      <div className={styles.movieInfo}>
        <h2>About the Movie</h2>
        <p>{movie.overview}</p>
        <div className={styles.metaData}>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}/10</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        </div>
      </div>
    </div>
  );
}