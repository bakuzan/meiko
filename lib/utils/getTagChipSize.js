export const MIN_FONT_SIZE = 1;
export const MAX_FONT_SIZE = 2;

export default function getChipSize(chips, count, opts = {}) {
  const minimum = opts.min || MIN_FONT_SIZE;
  const maximum = opts.max || MAX_FONT_SIZE;

  const counts = chips.map((x) => x.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  if (count === min) {
    return minimum;
  }

  return (count / max) * (maximum - minimum) + minimum;
}
