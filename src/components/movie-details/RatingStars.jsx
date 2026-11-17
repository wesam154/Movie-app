import React from 'react';

export default function RatingStars({ rating = 0 }) {
  // تحويل التقييم من 100 إلى 5 نجوم
  const starsCount = Math.round((rating / 100) * 5);
  
  return (
    <div style={{ display: 'flex', gap: '4px', color: '#ffc107', fontSize: '18px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= starsCount ? '★' : '☆'}
        </span>
      ))}
      <span style={{ marginLeft: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
        ({rating}%)
      </span>
    </div>
  );
}