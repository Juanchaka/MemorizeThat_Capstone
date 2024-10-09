export const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };
  
  export const calculateScore = (time, flips) => {
    return Math.max(0, 1000 - (time * 10) - (flips * 5));
  };
  
  export const generateCards = (pairCount = 8) => {
    const cards = [];
    for (let i = 0; i < pairCount; i++) {
      cards.push({ id: i * 2, value: i, isFlipped: false });
      cards.push({ id: i * 2 + 1, value: i, isFlipped: false });
    }
    return cards;
  };