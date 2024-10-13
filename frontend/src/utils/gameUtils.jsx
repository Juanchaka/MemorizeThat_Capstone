export const generateCards = (pairCount) => {

  const totalCards = pairCount * 2;
  const gridColumns = getComputedStyle(document.documentElement).getPropertyValue('--grid-columns');
  const adjustedTotalCards = Math.ceil(totalCards / gridColumns) * gridColumns;
  const adjustedPairCount = adjustedTotalCards / 2;

  const totalImages = 30;
  const selectedIndices = [];

  while (selectedIndices.length < adjustedPairCount) {
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    if (!selectedIndices.includes(randomIndex)) {
      selectedIndices.push(randomIndex);
    }
  }

  const pairs = [...selectedIndices, ...selectedIndices];
  return shuffleCards(pairs.map((value, index) => ({
    id: index,
    value: value,
    imageUrl: `/cards_front/card-${value}.jpg`
  })));
};

export const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};