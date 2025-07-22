export const getStars = (rating: number, max: number = 5) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = max - full - (half ? 1 : 0);
  return { full, half: half ? 1 : 0, empty };
};
