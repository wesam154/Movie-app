import React from 'react';

export default function ReviewCard({ review }) {
  const content = review.content || '';
  const formattedDate = review.created_at ? new Date(review.created_at).toLocaleDateString() : '';

  return (
    <div style={{ background: '#fff', padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '12px', border: '1px solid #eaeaea' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <h4 style={{ margin: 0, fontSize: '15px' }}>A review by {review.author}</h4>
        {formattedDate && (
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {formattedDate}
          </span>
        )}
      </div>
      <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
        {content.length > 250 ? content.substring(0, 250) + '...' : content}
      </p>
    </div>
  );
}