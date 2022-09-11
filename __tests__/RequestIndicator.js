import React from 'react';

import { RequestIndicator } from '../lib';

it('should render with minimum props', function () {
  const { container } = render(<RequestIndicator />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should render loader', function () {
  const { container, queryByTestId, getByTestId, rerender } = render(
    <RequestIndicator requestInFlight={false} />
  );

  expect(queryByTestId('requestIndicator')).toBeNull();

  rerender(<RequestIndicator requestInFlight={true} />);

  expect(getByTestId('requestIndicator')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should apply hide styles to loader', function () {
  const { container, getByTestId, rerender } = render(
    <RequestIndicator requestInFlight={true} />
  );

  let hasHiddenClass = getByTestId('requestIndicator').className.includes(
    'request-indicator__loader--hidden'
  );

  expect(hasHiddenClass).toBe(false);

  rerender(<RequestIndicator requestInFlight={true} hide />);

  hasHiddenClass = getByTestId('requestIndicator').className.includes(
    'request-indicator__loader--hidden'
  );

  expect(hasHiddenClass).toBe(true);
  expect(container).toMatchSnapshot();
});
