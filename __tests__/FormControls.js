import React from 'react';

import { FormControls } from '../lib';

const mockChangeFn = jest.fn();

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

afterEach(() => jest.resetAllMocks());

it('should render children', () => {
  const message = 'render this test error';
  const { getByText } = render(
    <FormControls.ErrorBlock>{message}</FormControls.ErrorBlock>
  );

  expect(getByText(message)).toBeTruthy();
});

it('should render error for clearable input', function () {
  const message = 'Jest Error Test';

  const { container, getByText, rerender } = render(
    <FormControls.ClearableInput
      id="jest"
      name="jester"
      value={'hello world'}
      error=""
      onChange={mockChangeFn}
    />
  );

  expect(container).toMatchSnapshot();

  rerender(
    <FormControls.ClearableInput
      id="jest"
      name="jester"
      value={'hello world'}
      error={message}
      onChange={mockChangeFn}
    />
  );

  expect(getByText(message)).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render error for select box', function () {
  const message = 'Jest Error Test';

  const { container, getByText, rerender } = render(
    <FormControls.SelectBox
      id="jest"
      name="jester"
      text="Jesters"
      value={''}
      options={options}
      onChange={mockChangeFn}
    />
  );

  expect(container).toMatchSnapshot();

  rerender(
    <FormControls.SelectBox
      id="jest"
      name="jester"
      text="Jesters"
      value={''}
      error={message}
      options={options}
      onChange={mockChangeFn}
    />
  );

  expect(getByText(message)).toBeTruthy();
  expect(container).toMatchSnapshot();
});
