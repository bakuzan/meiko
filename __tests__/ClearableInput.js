import React from 'react';

import { ClearableInput } from '../lib';

const value = '';
const mockChangeFn = jest.fn();

afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function () {
  const { container } = render(
    <ClearableInput id="jest" value={value} onChange={mockChangeFn} />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should call onChange when value is updated', function () {
  const changeEvent = { target: { value: 'hello world' } };
  const { getByLabelText } = render(
    <ClearableInput
      id="jest"
      label="jest input"
      value={value}
      onChange={mockChangeFn}
    />
  );

  const input = getByLabelText('jest input');
  fireEvent.change(input, changeEvent);

  expect(mockChangeFn).toHaveBeenCalled();
});

it('should be clearable when type equals "text"', async function () {
  const { container, getByLabelText, rerender } = render(
    <ClearableInput id="jest" value={'hello world'} onChange={mockChangeFn} />
  );

  const user = userEvent.setup();
  await user.click(getByLabelText('Clear input'));

  rerender(<ClearableInput id="jest" value={''} onChange={mockChangeFn} />);

  expect(mockChangeFn).toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

it('should NOT be clearable when type does not equal "text"', function () {
  const { queryByLabelText } = render(
    <ClearableInput
      id="jest"
      value={39}
      type="number"
      onChange={mockChangeFn}
    />
  );

  expect(queryByLabelText('Clear input')).toBeNull();
});

it('should display max length text', function () {
  const { getByText } = render(
    <ClearableInput
      id="jest"
      value={'hello world'}
      maxLength={140}
      onChange={mockChangeFn}
    />
  );

  expect(getByText('11/140')).toBeTruthy();
});

it('should display max text for number field', function () {
  const { getByText } = render(
    <ClearableInput
      id="jest"
      value={'hello world'}
      type="number"
      max={10}
      onChange={mockChangeFn}
    />
  );

  expect(getByText('out of 10')).toBeTruthy();
});
