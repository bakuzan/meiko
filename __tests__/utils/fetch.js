import fetchMock from 'fetch-mock';

import fetchFromServer from '../../lib/utils/fetch';

const payload = {
  good: { success: true }
};

function setup() {
  fetchMock.mock(/jest/, () => new Promise((resolve) => resolve(payload.good)));
}

afterEach(() => fetchMock.restore());

it('should return good payload', async () => {
  const expected = payload.good;

  setup();

  const result = await fetchFromServer('jest'); // defaults to GET

  expect(result).toEqual(expected);
});

it('should fail gracefully', async () => {
  const myError = new Error('JEST FAIL');
  const expected = { success: false, error: myError };

  fetchMock.mock(/jest/, () => {
    throw myError;
  });

  const result = await fetchFromServer('jest', 'GET');

  expect(result).toEqual(expected);
});

it('should stringify body content', () => {
  const mockedFn = jest.fn();
  JSON.stringify = mockedFn;

  setup();

  fetchFromServer('jest', 'POST', { test: 'test' });

  expect(mockedFn).toHaveBeenCalled();
});
