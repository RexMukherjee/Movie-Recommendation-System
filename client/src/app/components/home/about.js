"use client";
import React from 'react'
import styles from "../../../styles/home/about/about.module.css"
import Link from 'next/link'
import MovieCard from '../movies/cards/moviecards'
import allmovies from '../../data/movies.json'
import { useRef } from 'react';
const About = () => {
  const carouselRef = useRef();

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (current) {
      const scrollAmount = 220; // adjust based on card width
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const top10Movies = allmovies
    .sort((a, b) => b.imdb_rating - a.imdb_rating)
    .slice(0, 10);
  return (
    <main className={styles.body}>
        <img src='/logo.png' alt='Osbcura' className={styles.heading}/>
        <div className={styles.aboutpara}>
          <p>
          <strong>Obscura</strong> is your gateway into the world of cinema — from cult classics to the latest blockbusters.
          Whether you're a casual viewer or a hardcore movie buff, Obscura helps you discover, organize, and relive your favorite films like never before.
        </p>
        <p>
          Dive into a curated collection of movies, mark your favorites, and explore hidden gems. Obscura isn’t just about watching — it’s about experiencing stories that stick with you.
        </p>
        {/* <img src="/anyimg.jpeg" alt="" className={styles.img}/> */}
        
        </div>
        <button className={styles.explore} ><Link href="/components/movies" style={{color: "white", textDecoration: "none"}}>To Movies</Link></button>
        
        <h1>Top 10 Movies</h1>
        <section className={styles.carouselWrapper}>
        <button className={`${styles.arrowButton} ${styles.leftArrow}`} onClick={() => scroll("left")}>&#8249;</button>
        
        <div className={styles.carouselContainer} ref={carouselRef}>
          {top10Movies.map((movie) => (
            <div className={styles.movieCard} key={movie.id}>
               <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={() => scroll("right")}>&#8250;</button>
      </section>
    </main>
  )
}

export default About
