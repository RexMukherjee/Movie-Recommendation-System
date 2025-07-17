"use client";
import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
 import styles from "../../../../styles/movies/moviecard/moviecard.module.css";

export default function MovieCard({ movie }) {
  const [liked, setLiked] = useState(false);
  if (!movie) return null;

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    setLiked(!liked);
    //   localStorage/context
  };

  return (
      <div className={styles.cardContainer} > 
      
      <Link href={`/components/movies/singlemovie?id=${movie.id}`}>
        <img
          src={movie.poster_url}
          alt={movie.name}
          className={styles.poster}
        />
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{movie.name}</h3>
             
            <button
              onClick={toggleFavorite}
              className={`${styles.heartBtn} ${liked ? styles.liked : ""}`}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <p className={styles.rating}>IMDb: {movie.imdb_rating}</p>
        </div>
      </Link>
     
    </div>
  );
}
