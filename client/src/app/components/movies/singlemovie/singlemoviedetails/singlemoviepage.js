"use client";
import styles from "../../../../../styles/movies/singlemoviepage/singlemoviedetails/singlemoviepage/singlemoviepage.module.css";
import { useRouter, useSearchParams } from "next/navigation";
// import movies from "../../../../data/movies.json";
import { useEffect, useState } from "react";
import Reviewlist from "./reviewlist";
import Reviews from "./reviews";
import { useSession ,signIn} from "next-auth/react";
import { fetchMovies } from "@/lib/tmdb";

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
      router.push(`/components/login?callbackUrl=/watch/${movieId}`);
    }
  };

  useEffect(() => {
  //   if (movieId) {
  //     const foundMovie = movies.find((m) => String(m.id) === String(movieId));
  //     setMovie(foundMovie);
  //     // Load reviews from localStorage
  //     const savedReviews = localStorage.getItem(`reviews_${movieId}`);
  //     if (savedReviews) {
  //       setReviews(JSON.parse(savedReviews));
  //     }
  //   }
  // }, [movieId]);

  if (movieId) {
      const getMovie = async () => {
        try {
          const data = await fetchMovies(`/movie/${movieId}`, {
            append_to_response: "credits",
          });
          setMovie(data);

          // Load reviews from localStorage
          const savedReviews = localStorage.getItem(`reviews_${movieId}`);
          if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
          }
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      };
      getMovie();
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

  const director =
    movie.credits?.crew?.find((person) => person.job === "Director")?.name || "N/A";
  const actors =
    movie.credits?.cast?.slice(0, 5).map((actor) => actor.name) || [];

  return (
    <div className={styles.singleMovieContainer}>
      <div className={styles.heroSection}>
      <div className={styles.trailerContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={`Watch ${movie.title}`}
            className={styles.trailerPoster}
          />
          <button  onClick={handleWatchNow} className={styles.watchNowOverlay}>Watch Now</button>  
      </div>
      </div>

      {/* Movie Details Card */}
      <div className={styles.contentWrapper}>
      <div className={styles.detailsCard}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className={styles.poster} alt={movie.title} />
        <div className={styles.details}>
          <h2>{movie.name}</h2>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
          <p><strong>Year:</strong> {movie.release_date?.split("-")[0]}</p>
          <p><strong>Genre:</strong> {movie.genres?.map((g) => g.name).join(", ")}</p>
          <p><strong>Language:</strong> {movie.original_language}</p>
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Actors:</strong> {actors.join(", ")}</p>
          <p><strong>Description:</strong> {movie.overview}</p>
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
