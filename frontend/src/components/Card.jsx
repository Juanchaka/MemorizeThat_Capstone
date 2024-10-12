import React from 'react';

function Card({ card, isFlipped, onCardClick }) {
  const handleImageError = () => {
    console.error(`Failed to load image: ${card.imageUrl}`);
  };



  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onCardClick}>
      <div className="card-inner">
        <div className="card-back">
          <img src="/card_back/cardback.jpg" alt="Card Back" onError={handleImageError}/>
        </div>
        <div className="card-front">
          <img src={card.imageUrl} alt={card.value} />
        </div>
      </div>
    </div>
  );
}

export default Card;