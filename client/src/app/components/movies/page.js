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
    const filtered = movieData.filter((movie) => {
       const matchRating = !filters.rating || parseFloat(movie.imdb_rating) >= parseFloat(filters.rating);
      
      const matchLanguage = !filters.language || movie.language === filters.language;
      const matchGenre = !filters.genre || movie.genre === filters.genre;
      const matchCategory = !filters.category || movie.category === filters.category;
      const matchYear = !filters.year || movie.release_year == filters.year;

      return matchRating && matchLanguage && matchGenre && matchCategory && matchYear;
    });
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
