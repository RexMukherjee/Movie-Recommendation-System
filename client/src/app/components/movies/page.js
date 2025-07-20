"use client"
import React, { useState } from 'react'
import MovieGrid from "./cards/moviegrid";
import movieData from "../../data/movies.json";
import styles from "../../../styles/movies/page.module.css"
import Footer from '../home/footer';
import Navbar from '../home/navbar';
import FilterPanel from './cards/filterpanel';
{/*Cards On click -> "/components/movies/singlemovie" */}


const Movies = () => {
  const [filteredMovies, setFilteredMovies] = useState(movieData);

  const applyFilters = (filters) => {
    // const filtered = movieData.filter((movie) => {
    //   const matchRating = !filters.rating || parseFloat(movie.imdb_rating) >= parseFloat(filters.rating);
      
    //   const matchLanguage = !filters.language || movie.language === filters.language;
    //   const matchGenre = !filters.genre || movie.genre === filters.genre;
    //   const matchCategory = !filters.category || movie.category === filters.category;
    //   const matchYear = !filters.year || movie.release_year == filters.year;

    //   return matchRating && matchLanguage && matchGenre && matchCategory && matchYear;
    // });
    let filtered = movieData.filter((movie) => {
    const matchLanguage = !filters.language || movie.language === filters.language;
    const matchGenre = !filters.genre || movie.genre === filters.genre;
    const matchCategory = !filters.category || movie.category === filters.category;
    const matchYear = !filters.year || movie.release_year == filters.year;
    return matchLanguage && matchGenre && matchCategory && matchYear;
  });

  if (filters.sortBy === "alphabet") {
 filtered.sort((a, b) => {
    const nameA = (a.name || "").toLowerCase();
    const nameB = (b.name || "").toLowerCase();

    const startsWithLetterA = /^[a-z]/.test(nameA);
    const startsWithLetterB = /^[a-z]/.test(nameB);

    if (startsWithLetterA && !startsWithLetterB) return -1;
    if (!startsWithLetterA && startsWithLetterB) return 1;

    return nameA.localeCompare(nameB);
  });
  } else if (filters.sortBy === "rating") {
    filtered.sort((a, b) => parseFloat(b.imdb_rating) - parseFloat(a.imdb_rating));
  } else if (filters.sortBy === "trending") {
    filtered.sort((a, b) => b.trending_score - a.trending_score); // adjust as per your data field
  }

  if (filtered.length === 0) {
    alert("No movies found for the selected filters!");
  }

  setFilteredMovies(filtered);
    if (filtered.length === 0) {
    alert("No movies found for the selected filters!");
  }
    setFilteredMovies(filtered);
  };
  return (
    <main>
      <Navbar/>
      <div className={styles.moviesPage}>
        <h1 className={styles.title}>All Movies</h1>
        <FilterPanel onFilter={applyFilters}/>
        <MovieGrid movies={filteredMovies} />
      </div>
      <Footer/>
    </main>
  )
}

export default Movies
