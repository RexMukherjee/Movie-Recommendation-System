import React from 'react'
import styles from "../../../../../styles/movies/singlemoviepage/reviewlist/reviewlist.module.css"
const Reviewlist = ({reviews}) => {
  return (
     <div className={styles.reviewsList}>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <h4>{review.name}</h4>
              <div className={styles.reviewRating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span 
                    key={i} 
                    className={i < review.rating ? styles.starFilled : styles.starEmpty}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className={styles.reviewDate}>{review.date}</span>
            </div>
            <p className={styles.reviewComment}>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default Reviewlist
