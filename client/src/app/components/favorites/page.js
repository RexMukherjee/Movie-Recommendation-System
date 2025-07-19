"use client"
import React from 'react'
import Navbar from '../home/navbar'
import Footer from '../home/footer'
import MovieCard from '../movies/cards/moviecards'
import styles from "../../../styles/favorites/page.module.css"
import { useFavorites } from '../../context/FavoritesContext'

const Favorites = () => {
  const { favorites } = useFavorites();
  return (
    <main>
      <Navbar/>
      <div className={styles.container}>
        
        <h1 className={styles.heading}>Your Favorite Movies </h1>
        {favorites.length === 0 ? (
          <p className={styles.emptyMessage}>No favorites yet. Go like some movies!</p>
        ) : (
          <div className={styles.grid}>
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        
      </div>
      <Footer/>
    </main>
  )
}

export default Favorites
