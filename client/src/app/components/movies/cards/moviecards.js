"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
 import styles from "../../../../styles/movies/moviecard/moviecard.module.css";
import { useFavorites } from "@/app/context/FavoritesContext";

export default function MovieCard({ movie }) {
  // const [liked, setLiked] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const liked = isFavorite(movie.id);
  if (!movie) return null;

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    // setLiked(!liked);
    liked ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };
  return (
      <div className={styles.cardContainer} > 
      
      <Link href={`/components/movies/singlemovie?id=${movie.id}`} className={styles.movielink}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{movie.title}</h3>
             
            <button
              onClick={toggleFavorite}
              className={`${styles.heartBtn} ${liked ? styles.liked : ""}`}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <p className={styles.rating}>IMDB: {movie.vote_average?.toFixed(1)}</p>
        </div>
      </Link>
     
    </div>
  );
}
