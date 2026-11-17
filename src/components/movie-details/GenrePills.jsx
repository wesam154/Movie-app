import React from 'react';
export default function GenrePills({ genres = [] }) {
  if (!genres.length) return null;

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '12px 0' }}>
      {genres.map((genre) => (
        <span 
          key={genre.id} 
          style={{
            background: '#eee',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--color-text-primary)'
          }}
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
}