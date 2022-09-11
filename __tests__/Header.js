import React from 'react';

import { Header } from '../lib';

it('should render with minimum props', function () {
  const { container } = render(<Header />);

  expect(container.firstChild).not.toBeNull();
  expect(container).toMatchSnapshot();
});

it('should render title', function () {
  const { container, getByText, queryByText, rerender } = render(
    <Header title="" />
  );

  expect(queryByText('hello world')).toBeNull();

  rerender(<Header title={'hello world'} />);

  expect(getByText('hello world')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render navLeft', function () {
  const { container, getByText, queryByText, rerender } = render(
    <Header navLeft="" />
  );

  expect(queryByText('left side')).toBeNull();

  rerender(<Header navLeft={<div>left side</div>} />);

  expect(getByText('left side')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render navRight', function () {
  const { container, getByText, queryByText, rerender } = render(
    <Header navRight="" />
  );

  expect(queryByText('right side')).toBeNull();

  rerender(<Header navRight={<div>right side</div>} />);

  expect(getByText('right side')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should left align title', function () {
  const { container, rerender } = render(<Header title="Hello" />);

  expect(container).toMatchSnapshot();

  rerender(<Header title="Hello" leftAlignTitle />);

  expect(container).toMatchSnapshot();
});
