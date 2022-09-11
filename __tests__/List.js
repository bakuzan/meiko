import React from 'react';

import { List } from '../lib';

it('should render with minimum props', function () {
  const { container } = render(<List />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render children', function () {
  const { container, getByText } = render(
    <List>
      <li>my item</li>
    </List>
  );

  expect(getByText('my item')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should apply wrapping style', function () {
  const { container } = render(
    <List shouldWrap>
      <li />
      <li />
      <li />
    </List>
  );

  expect(container).toMatchSnapshot();
});

it('should apply columns style', function () {
  const { container, rerender } = render(
    <List columns={1}>
      <li />
      <li />
      <li />
    </List>
  );

  expect(container).toMatchSnapshot();

  rerender(
    <List columns={2}>
      <li />
      <li />
      <li />
    </List>
  );

  expect(container).toMatchSnapshot();
});
