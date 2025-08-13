"use client";
import MovieCard from "./moviecards";
import styles from "../../../../styles/movies/moviegrid/moviegrid.module.css";
import { useState } from "react";

export default function MovieGrid({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  
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
    {/* {totalPages > 1 && (
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
      )} */}
      {totalPages > 1 && (
  <div className={styles.pagination}>
    <button
      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className={styles.pageBtn}
    >
      ←
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter(
        (number) =>
          number === 1 ||
          number === totalPages ||
          (number >= currentPage - 1 && number <= currentPage + 1)
      )
      .map((number, index, arr) => {
        if (
          index > 0 &&
          number - arr[index - 1] > 1
        ) {
          return (
            <span key={`ellipsis-${number}`} className={styles.ellipsis}>
              ...
            </span>
          );
        }

        return (
          <button
            key={`page-${number}`}
            onClick={() => paginate(number)}
            className={`${styles.pageBtn} ${
              currentPage === number ? styles.active : ""
            }`}
          >
            {number}
          </button>
        );
      })}

    
    <button
      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={styles.pageBtn}
    >
      →
    </button>
    <button
      onClick={() => paginate(totalPages)}
      disabled={currentPage === totalPages}
      className={styles.pageBtn}
    >
      Last
    </button>
  </div>
)}

    </div>
  );
}
