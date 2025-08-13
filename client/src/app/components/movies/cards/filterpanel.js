"use client";
import { useState, useEffect } from "react";
import styles from "../../../../styles/movies/filterpanel/filterpanel.module.css";

import { LuSearch } from "react-icons/lu";

export default function FilterPanel({ onFilter }) {
  const [filters, setFilters] = useState({
    // rating: "",
    sortBy: "",
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
      {/* <select name="rating" value={filters.rating} className={styles.select} onChange={handleChange}>
        <option value="">All Ratings</option>
         {Array.from({ length: 41 }, (_, i) => {
            const val = (5 - i * 0.1).toFixed(1);
            return (
              <option key={val} value={val}>
                {val}
              </option>
            );
          })}
      </select> */}
      <select name="sortBy" value={filters.sortBy} className={styles.select} onChange={handleChange} style={{backgroundColor: "#353535ff"}}>
            <option value="">Sort By</option>
            <option value="alphabet">A - Z</option>
            <option value="rating">Rating</option>
            <option value="trending">Trending</option>
      </select>


      <select name="language" value={filters.language} className={styles.select} onChange={handleChange} style={{backgroundColor: "#353535ff"}}>
        <option value="">Languages</option>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="ko">Korean</option>
        <option value="ja">Japanese</option>
        <option value="de">German</option>
        <option value="th">Thai</option>
        <option value="zh">Chinese</option>
        <option value="bn">Bengali</option>
      </select>

      <select name="genre" value={filters.genre} className={styles.select} onChange={handleChange} style={{backgroundColor: "#353535ff"}}>
        <option value="">Genres</option>
        <option value="53">Thriller</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="27">Horror</option>
        <option value="14">Fantasy</option>
        <option value="16">Animation</option>
      </select>

      <select name="category" value={filters.category} className={styles.select} onChange={handleChange} style={{backgroundColor: "#353535ff"}}>
        <option value="">Categories</option>
        <option value="Hollywood">Hollywood</option>
        <option value="Bollywood">Bollywood</option>
        <option value="Tollywood">Tollywood</option>
        <option value="Kdrama">Kdrama</option>
        <option value="Jdrama">Jdrama</option>
        <option value="animation">Anime</option>
        <option value="animation">Cartoons</option>
      </select>

      <select name="year" value={filters.year} onChange={handleChange} className={styles.select} style={{backgroundColor: "#353535ff"}}>
        <option value="">Years</option>
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
