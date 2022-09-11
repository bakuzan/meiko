import React from 'react';

import { SelectBox } from '../lib';

const mockedChangeFn = jest.fn();

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

it('should render with minimum props', function () {
  const { container } = render(
    <SelectBox
      id="jest"
      text="Jesters"
      value={''}
      options={options}
      onChange={mockedChangeFn}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call onChange', function () {
  const changeEvent = { target: { value: 2 } };
  const { container, getByLabelText } = render(
    <SelectBox
      id="jest"
      text="Jesters"
      value={''}
      options={options}
      onChange={mockedChangeFn}
    />
  );

  const selectBox = getByLabelText('Jesters');
  fireEvent.change(selectBox, changeEvent);

  expect(selectBox.children.length).toBe(3);
  expect(mockedChangeFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});
