import { fireEvent } from '@testing-library/react';
import React from 'react';

import { AutocompleteInput } from '../lib';
import textMatcher from './__helpers__/getByTextComplex';

const attr = 'text';
const filter = '';
const items = [
  { id: 5, text: 'Bat' },
  { id: 6, text: 'Cat' },
  { id: 9, text: 'Frog' }
];
const mockChangeFn = jest.fn();
const mockSelectFn = jest.fn();

afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function () {
  const { container } = render(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={filter}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
    />
  );

  expect(container).toMatchSnapshot();
});

it('should render filtered items when filter updated', async function () {
  const { container, getByText, getByTitle, queryByText, rerender } = render(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={filter}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
      clearableInputProps={{ title: 'testInput' }}
    />
  );

  expect(container).toMatchSnapshot();

  // Check the display changes with the filter update
  rerender(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={'at'}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
      clearableInputProps={{ title: 'testInput' }}
    />
  );

  const user = userEvent.setup();
  await user.click(getByTitle('testInput'));

  expect(getByText(textMatcher('Bat'))).toBeTruthy();
  expect(getByText(textMatcher('Cat'))).toBeTruthy();
  expect(queryByText(textMatcher('Frog'))).toBeNull();
  expect(container).toMatchSnapshot();
});

it('should call onChange when filter updated', async function () {
  const { getByTitle } = render(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={filter}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
      clearableInputProps={{ title: 'testInput' }}
    />
  );

  fireEvent.change(getByTitle('testInput'), { target: { value: 'at' } });

  expect(mockChangeFn).toHaveBeenCalled();
});

it('should call onSelect when suggestion is click', async function () {
  const { container, getByText, getByTitle } = render(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={'at'}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
      clearableInputProps={{ title: 'testInput' }}
    />
  );

  const user = userEvent.setup();
  await user.click(getByTitle('testInput'));
  await user.click(getByText(textMatcher('Bat')));

  expect(mockSelectFn).toHaveBeenCalledWith(5);
  expect(container).toMatchSnapshot();
});
