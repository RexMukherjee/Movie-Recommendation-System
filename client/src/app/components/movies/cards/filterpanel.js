"use client";
import { useState, useEffect } from "react";
import styles from "../../../../styles/movies/filterpanel/filterpanel.module.css";

import { LuSearch } from "react-icons/lu";

export default function FilterPanel({ onFilter }) {
  const [filters, setFilters] = useState({
    rating: "",
    language: "",
    genre: "",
    category: "",
    year: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onFilter(filters); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select name="rating" value={filters.rating} className={styles.select} onChange={handleChange}>
        <option value="">All Ratings</option>
         {Array.from({ length: 41 }, (_, i) => {
            const val = (5 - i * 0.1).toFixed(1);
            return (
              <option key={val} value={val}>
                {val}
              </option>
            );
          })}
      </select>

      <select name="language" value={filters.language} className={styles.select} onChange={handleChange}>
        <option value="">All Languages</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Korean">Korean</option>
        <option value="Japanese">Japanese</option>
        <option value="German">German</option>
        <option value="Thai">Thai</option>
        <option value="Chinese">Chinese</option>
        <option value="Bengali">Bengali</option>
      </select>

      <select name="genre" value={filters.genre} className={styles.select} onChange={handleChange}>
        <option value="">All Genres</option>
        <option value="Thriller">Thriller</option>
        <option value="Suspense">Suspense</option>
        <option value="Romance">Romance</option>
        <option value="Mystery">Mystery</option>
        <option value="Cult Classic">Cult Classic</option>
        <option value="Supernatural">Supernatural</option>
      </select>

      <select name="category" value={filters.category} className={styles.select} onChange={handleChange}>
        <option value="">All Categories</option>
        <option value="Hollywood">Hollywood</option>
        <option value="Bollywood">Bollywood</option>
        <option value="Tollywood">Tollywood</option>
        <option value="Kdrama">Kdrama</option>
        <option value="Jdrama">Jdrama</option>
        <option value="Anime">Anime</option>
        <option value="Cartoons">Cartoons</option>
      </select>

      <select name="year" value={filters.year} onChange={handleChange} className={styles.select}>
        <option value="">All Years</option>
        {Array.from({ length: 25 }, (_, i) => {
          const year = 2025 - i;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <button type="submit" className={styles.button} ><LuSearch /></button>
    </form>
  );
}
