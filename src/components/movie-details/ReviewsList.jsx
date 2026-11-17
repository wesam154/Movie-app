import React from 'react';
import ReviewCard from './ReviewCard.jsx';

export default function ReviewsList({ reviews = [] }) {
  if (!reviews.length) {
    return <p style={{ color: 'var(--color-text-secondary)' }}>No reviews found for this movie.</p>;
  }

  return (
    <div style={{ marginTop: '24px' }}>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}