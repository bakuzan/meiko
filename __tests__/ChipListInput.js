import React from 'react';

import { ChipListInput } from '../lib';

const attr = 'text';
const options = [
  { id: 5, text: 'Bat' },
  { id: 6, text: 'Cat' },
  { id: 9, text: 'Frog' }
];
const mockUpdateFn = jest.fn();

afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function() {
  const component = shallow(
    <ChipListInput
      id="jest"
      name="jest"
      attr={attr}
      chipsSelected={[]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  expect(component.is('.chip-list-input')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should call updateChipList when suggestion is clicked', function() {
  const component = mount(
    <ChipListInput
      id="jest"
      name="jest"
      attr={attr}
      chipsSelected={[]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  const input = component.find('input#jest');
  input.simulate('focus', {});
  expect(component.state('isFocused')).toBe(true);

  component.setState({ text: 'at' });

  const suggestion = component.find('AutocompleteSuggestionItem').at(0);
  suggestion.find('button').simulate('click');

  expect(mockUpdateFn).toHaveBeenCalledWith('jest', [{ id: 5, text: 'Bat' }]);
  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should render selected chips and remove', function() {
  const component = mount(
    <ChipListInput
      id="jest"
      name="jest"
      attr={attr}
      chipsSelected={[{ id: 5, text: 'Bat' }]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  const chips = component.find('TagChip');
  expect(chips.exists()).toBe(true);
  expect(component).toMatchSnapshot();

  const chip = chips.at(0);
  chip.find('button').simulate('click');

  expect(mockUpdateFn).toHaveBeenCalledWith('jest', []);
  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should ready removal of selected chip', function() {
  const backspace = 8;

  const component = mount(
    <ChipListInput
      id="jest"
      name="jest"
      attr={attr}
      chipsSelected={[{ id: 5, text: 'Bat' }]}
      chipOptions={options}
      updateChipList={mockUpdateFn}
    />
  );

  const input = component.find('input#jest');
  input.simulate('keydown', { keyCode: backspace });

  expect(component.state('readyRemoval')).toBe(true);
  expect(component).toMatchSnapshot();
  component.unmount();
});
