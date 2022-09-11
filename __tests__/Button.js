import React from 'react';

import { Button } from '../lib';

const mockFn = jest.fn();

afterEach(() => jest.resetAllMocks());

it('should render when no props', function () {
  const { container } = render(<Button />);

  expect(container.firstChild).not.toBeNull();
  expect(container).toMatchSnapshot();
});

it('should pass on click', async function () {
  const words = 'Click me!';
  const { getByText } = render(<Button onClick={mockFn}>{words}</Button>);

  const user = userEvent.setup();
  await user.click(getByText(words));

  expect(mockFn).toHaveBeenCalled();
});

it('should render apply style class', function () {
  const { container } = render(<Button btnStyle="primary" />);

  expect(container).toMatchSnapshot();
});

it('should render apply size class', function () {
  const { container } = render(<Button btnSize="small" />);

  expect(container).toMatchSnapshot();
});

it('should render apply link class', function () {
  const { container } = render(<Button link />);

  expect(container).toMatchSnapshot();
});

it('should render apply icon class', function () {
  const { container } = render(<Button icon="T" />);

  expect(container).toMatchSnapshot();
});
