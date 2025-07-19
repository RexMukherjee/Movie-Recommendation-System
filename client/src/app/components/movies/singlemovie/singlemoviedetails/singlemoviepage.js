"use client";
import styles from "../../../../../styles/movies/singlemoviepage/singlemoviedetails/singlemoviepage/singlemoviepage.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import movies from "../../../../data/movies.json";
import { useEffect, useState } from "react";
import Reviewlist from "./reviewlist";
import Reviews from "./reviews";
import { useSession ,signIn} from "next-auth/react";

export default function SingleMoviePage() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("reviews");
   const { data: session } = useSession();
  const router = useRouter();

  const handleWatchNow = () => {
    if (session?.user) {
      router.push(`/watch/${movieId}`);
    } else {
      signIn("google",{ callbackUrl: `/watch/${movieId}` });
    }
  };

  useEffect(() => {
    if (movieId) {
      const foundMovie = movies.find((m) => String(m.id) === String(movieId));
      setMovie(foundMovie);
      // Load reviews from localStorage
      const savedReviews = localStorage.getItem(`reviews_${movieId}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    }
  }, [movieId]);
  const handleReviewSubmit = (review) => {
    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${movieId}`, JSON.stringify(updatedReviews));
    setActiveTab("reviews"); 
  };

  if (!movie) {
    return <div className={styles.notfound}>Movie not found.</div>;
  }

  return (
    <div className={styles.singleMovieContainer}>
      <div className={styles.heroSection}>
      <div className={styles.trailerContainer}>
          <img
            src={movie.poster_url}
            alt={`Watch ${movie.name}`}
            className={styles.trailerPoster}
          />
          <button  onClick={handleWatchNow} className={styles.watchNowOverlay}>Watch Now</button>  
      </div>
      </div>

      {/* Movie Details Card */}
      <div className={styles.contentWrapper}>
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
          <p><strong>Description:</strong> {movie.summary}</p>
        </div>
      </div>
      {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <div className={styles.reviewTabs}>
            <button
              className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'write' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('write')}
            >
              Write a Review
            </button>
          </div>

          {activeTab === 'write' ? (
            <Reviews movieId={movieId} onReviewSubmit={handleReviewSubmit} />
          ) : (
            <Reviewlist reviews={reviews} />
          )}
        </div>

      </div>
    </div>
  );
}
