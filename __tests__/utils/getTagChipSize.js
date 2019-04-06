import getTagChipSize, {
  MIN_FONT_SIZE,
  MAX_FONT_SIZE
} from '../../lib/utils/getTagChipSize';

const chips = [{ count: 5 }, { count: 4 }, { count: 2 }, { count: 1 }];

it('should return a number', function() {
  const expected = 'number';

  const result = getTagChipSize(chips, 1);

  expect(typeof result).toEqual(expected);
});

it('should return the minimum', function() {
  const expected = MIN_FONT_SIZE;

  const result = getTagChipSize(chips, 1);

  expect(result).toEqual(expected);
});

it('should return the maximum', function() {
  const expected = MAX_FONT_SIZE;

  const result = getTagChipSize(chips, 5);

  expect(result).toEqual(expected);
});

it('should return the correct percentage of the maximum', function() {
  const expected = 1.8;

  const result = getTagChipSize(chips, 4);

  expect(result).toEqual(expected);
});
