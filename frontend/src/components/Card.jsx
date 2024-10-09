import React from 'react';

function Card({ card, onCardClick }) {
  return (
    <div 
      className={`card ${card.isFlipped ? 'flipped' : ''}`} 
      onClick={() => onCardClick(card)}
    >
      {card.isFlipped ? card.value : '?'}
    </div>
  );
}

export default Card;