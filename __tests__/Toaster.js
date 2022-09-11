import { act } from '@testing-library/react';
import React from 'react';

import { Toaster, toaster } from '../lib';

beforeAll(() => {
  Date.now = jest.fn(() => new Date('2019-04-04').getTime());
});

afterAll(() => jest.restoreAllMocks());

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('should render with minimum props', function () {
  const { container } = render(<Toaster />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render toasts when popped', function () {
  const { container, getByText } = render(<Toaster />);

  act(() => {
    toaster.info('jest', 'this is a test');
  });

  expect(getByText('jest')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should remove toasts on click', async function () {
  const { container, getByText, queryByText } = render(<Toaster />);

  await act(async () => {
    toaster.info('jest', 'this is a test');

    expect(getByText('jest')).toBeTruthy();

    const user = userEvent.setup();
    await user.click(getByText('jest'));
  });

  expect(queryByText('jest')).toBeNull();
  expect(container).toMatchSnapshot();
});

// todo must fix
xit('should remove toasts after 3sec', function () {
  const { container, queryByText } = render(<Toaster />);

  act(() => {
    toaster.info('jest', 'this is a test');
    jest.runOnlyPendingTimers();
  });

  expect(queryByText('jest')).toBeNull();
  expect(container).toMatchSnapshot();
});
