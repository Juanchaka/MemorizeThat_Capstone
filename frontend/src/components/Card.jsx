import React from 'react';
// import cardBackImage from '../assets/card_back/cardback.jpg';


function Card({ card, isFlipped, onCardClick }) {
  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={onCardClick}>
      <div className="card-inner">
        <div className="card-back">
          <img src="CARDBACKIMAGE" alt="Card Back" />
        </div>
        <div className="card-front">
          <img src={card.imageUrl} alt={card.value} />
        </div>
      </div>
    </div>
  );
}

export default Card;