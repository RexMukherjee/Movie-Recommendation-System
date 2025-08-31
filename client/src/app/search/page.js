"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMovies } from "@/lib/tmdb";
import styles from "@/styles/search/page.module.css";
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!query) return;

    async function loadMovies() {
      try {
        const data = await fetchMovies("/search/movie", { query });
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [query]);

  if (!query) {
    return (
      <div className={styles.message}>
        <p>Please enter a movie name to search.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.message}>
        <p className={styles.loading}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Results for "{query}"</h2>

      {movies.length === 0 ? (
        <p className={styles.noResults}>
          No movie found with name "{query}"
        </p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              className={styles.cardLink}
              href={`/components/movies/singlemovie?id=${movie.id}`}
              onClick={() => router.push(`/components/movies/singlemovie?id=${movie.id}`)}// 👈 navigate to single movie page
            >
            <div className={styles.card}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.poster}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}

              <div className={styles.cardContent}>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.releaseDate}>{movie.release_date}</p>
                <p className={styles.rating}>
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </p>
              </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
