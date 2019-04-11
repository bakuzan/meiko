import resolveErrorMessage from '../../lib/utils/resolveErrorMessage';

it('should return a undefined if passed nothing', function() {
  const expected = undefined;

  const result = resolveErrorMessage();

  expect(result).toEqual(expected);
});

it('should return error', function() {
  const error = 'jest test error';
  const name = 'jest';
  const expected = error;

  const result = resolveErrorMessage(error, name);

  expect(result).toEqual(expected);
});

it('should return error from map', function() {
  const errorMessage = 'jest test error';
  const error = new Map([['jest', errorMessage]]);
  const name = 'jest';
  const expected = errorMessage;

  const result = resolveErrorMessage(error, name);

  expect(result).toEqual(expected);
});

it('should return undefined from map with key', function() {
  const error = new Map([[]]);
  const name = 'jest';
  const expected = undefined;

  const result = resolveErrorMessage(error, name);

  expect(result).toEqual(expected);
});

it('should return error from object', function() {
  const errorMessage = 'jest test error';
  const error = { jest: errorMessage };
  const name = 'jest';
  const expected = errorMessage;

  const result = resolveErrorMessage(error, name);

  expect(result).toEqual(expected);
});

it('should return undefined from object without key', function() {
  const error = {};
  const name = 'jest';
  const expected = undefined;

  const result = resolveErrorMessage(error, name);

  expect(result).toEqual(expected);
});
