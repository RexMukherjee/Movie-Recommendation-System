"use client";
import styles from "../../../../../styles/movies/singlemoviepage/singlemoviedetails/singlemoviepage/singlemoviepage.module.css";
import { useSearchParams } from "next/navigation";
import movies from "../../../../data/movies.json";
import { useEffect, useState } from "react";

export default function SingleMoviePage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieId) {
      const foundMovie = movies.find((m) => String(m.id) === String(movieId));
      setMovie(foundMovie);
    }
  }, [movieId]);

  if (!movie) {
    return <div className={styles.notfound}>Movie not found.</div>;
  }

  return (
    <div className={styles.singleMovieContainer}>
      <div className={styles.trailerContainer}>
        <a
          href="https://www.hydraflix.vip/dora-and-the-search-for-sol-dorado/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.watchNowLink}
        >
          <img
            src={movie.poster_url}
            alt={`Watch ${movie.name}`}
            className={styles.trailerPoster}
          />
          <div className={styles.watchNowOverlay}>Watch Now</div>
        </a>
      </div>

      {/* Movie Details Card */}
      <div className={styles.detailsCard}>
        <img src={movie.poster_url} className={styles.poster} alt={movie.name} />
        <div className={styles.details}>
          <h2>{movie.name}</h2>
          <p><strong>Rating:</strong> {movie.imdb_rating}</p>
          <p><strong>Year:</strong> {movie.release_year}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Language:</strong> {movie.language}</p>
          <p><strong>Director:</strong> {Array.isArray(movie.director) ? movie.director.join(", ") : movie.director}</p>
          <p><strong>Actors:</strong> {Array.isArray(movie.actors) ? movie.actors.join(", ") : movie.actors}</p>
<<<<<<< Updated upstream
=======
          <p><strong>Description:</strong> {movie.summary}</p>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
}
