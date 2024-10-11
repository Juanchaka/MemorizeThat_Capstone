export const generateCards = (pairCount) => {
  pairCount = Math.floor(pairCount / 2) * 2;
  if (pairCount * 2 % 4 !== 0) {
    pairCount += 2;
  }

  const values = Array.from({ length: pairCount }, (_, i) => i + 1);
  const pairs = [...values, ...values];
  return pairs.map((value, index) => ({
    id: index,
    value: value,
  }));
};

export const shuffleCards = (cards) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};