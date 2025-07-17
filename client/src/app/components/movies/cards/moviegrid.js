"use client";
import MovieCard from "./moviecards";
import styles from "../../../../styles/movies/moviegrid/moviegrid.module.css";

export default function MovieGrid({ movies }) {
  return (
    <div className={styles.gridContainer}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
