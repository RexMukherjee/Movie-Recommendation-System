"use client";
import styles from "../../../../../styles/movies/singlemoviepage/reviewsection/review.module.css";
import { useState } from "react";
const Reviews = ({ movieId, onReviewSubmit }) => {
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };
   const validateForm = () => {
    const newErrors = {};
    if (!newReview.name.trim()) newErrors.name = "Name is required";
    if (!newReview.comment.trim()) newErrors.comment = "Review is required";
    if (newReview.rating < 1 || newReview.rating > 5) newErrors.rating = "Rating must be between 1-5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reviewToAdd = {
      ...newReview,
      date: new Date().toISOString().split('T')[0],
      id: Date.now(),
      movieId: movieId
    };
    onReviewSubmit(reviewToAdd);
    setNewReview({
      name: "",
      rating: 5,
      comment: ""
    });
    };
  return (
     <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h3>Write a Review</h3>
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newReview.name}
          onChange={handleInputChange}
          className={errors.name ? styles.errorInput : ""}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          name="rating"
          value={newReview.rating}
          onChange={handleInputChange}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="comment">Your Review:</label>
        <textarea
          id="comment"
          name="comment"
          value={newReview.comment}
          onChange={handleInputChange}
          rows="5"
          className={errors.comment ? styles.errorInput : ""}
        ></textarea>
        {errors.comment && <span className={styles.error}>{errors.comment}</span>}
      </div>
      
      <button type="submit" className={styles.submitButton}>Submit Review</button>
    </form>
  )
}

export default Reviews
