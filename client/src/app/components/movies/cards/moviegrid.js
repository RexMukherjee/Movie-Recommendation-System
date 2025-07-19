"use client";
import MovieCard from "./moviecards";
import styles from "../../../../styles/movies/moviegrid/moviegrid.module.css";
import { useState } from "react";

export default function MovieGrid({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  
  const totalPages = Math.ceil(movies.length / moviesPerPage);

 
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className={styles.movieSection}>
      <div className={styles.gridContainer}>
      {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
    {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`${styles.pageBtn} ${
                currentPage === number ? styles.active : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
