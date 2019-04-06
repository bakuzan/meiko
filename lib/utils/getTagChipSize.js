export const MIN_FONT_SIZE = 1;
export const MAX_FONT_SIZE = 2;

export default function getChipSize(chips, count) {
  const counts = chips.map((x) => x.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  if (count === min) {
    return MIN_FONT_SIZE;
  }

  return (count / max) * (MAX_FONT_SIZE - MIN_FONT_SIZE) + MIN_FONT_SIZE;
}
