import React from 'react';

function Card({ card, isFlipped, onCardClick }) {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onCardClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">{card.value}</div>
      </div>
    </div>
  );
}

export default Card;