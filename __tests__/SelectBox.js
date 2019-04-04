import React from 'react';

import { SelectBox } from '../lib';

const mockedChangeFn = jest.fn();

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

it('should render with minimum props', function() {
  const component = shallow(
    <SelectBox
      id="jest"
      text="Jesters"
      value={''}
      options={options}
      onChange={mockedChangeFn}
    />
  );

  expect(component.is('.select-container')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should call onChange', function() {
  const changeEvent = { target: { value: 2 } };
  const component = shallow(
    <SelectBox
      id="jest"
      text="Jesters"
      value={''}
      options={options}
      onChange={mockedChangeFn}
    />
  );

  expect(component.find('option').length).toBe(3);

  component.find('select').simulate('change', changeEvent);

  expect(mockedChangeFn).toHaveBeenCalled();
  expect(component).toMatchSnapshot();
});
