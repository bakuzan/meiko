import React from 'react';

import { AutocompleteInput } from '../lib';

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

it('should render with minimum props', function() {
  const component = shallow(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={filter}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
    />
  );

  expect(component.is('.autocomplete')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

xit('should call onChange when filter updated', function() {
  const changeEvent = { target: { value: 'at' } };
  const component = mount(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={filter}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
    />
  );

  const input = component.find('input#jest');
  input.simulate('change', changeEvent);

  expect(mockChangeFn).toHaveBeenCalled();
  expect(component.state('activeSuggestion')).toEqual(0);
  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should call onSelect when suggestion is click', function() {
  const component = mount(
    <AutocompleteInput
      id="jest"
      attr={attr}
      filter={'at'}
      items={items}
      onChange={mockChangeFn}
      onSelect={mockSelectFn}
    />
  );

  const input = component.find('input#jest');
  input.simulate('focus', {});
  expect(component.state('inUse')).toBe(true);

  const suggestion = component.find('AutocompleteSuggestionItem').at(0);
  suggestion.find('button').simulate('click');

  expect(mockSelectFn).toHaveBeenCalledWith(5);
  expect(component).toMatchSnapshot();
  component.unmount();
});
