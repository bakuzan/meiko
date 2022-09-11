import { act } from '@testing-library/react';
import React from 'react';

import {
  LoadingBouncer,
  LoadingSpinner,
  LoadableContent,
  SimpleLoading,
  Loading
} from '../lib';

describe('LoadingBouncer', function () {
  it('should render with minimum props', function () {
    const { container } = render(<LoadingBouncer />);

    expect(container.firstChild).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

describe('LoadingSpinner', function () {
  it('should render with minimum props', function () {
    const { container } = render(<LoadingSpinner />);

    expect(container.firstChild).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

describe('SimpleLoading', function () {
  it('should render with minimum props', function () {
    const { container } = render(<SimpleLoading />);

    expect(container.firstChild).toBeNull();
  });

  it('should render', function () {
    const { container } = render(<SimpleLoading pastDelay={true} />);

    expect(container.firstChild).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

describe('Loading', function () {
  it('should render with minimum props', function () {
    const { container } = render(<Loading />);

    expect(container.firstChild).toBeNull();
  });

  it('should render', function () {
    const { container } = render(<Loading pastDelay={true} />);

    expect(container.firstChild.className.includes('loader')).toBe(true);
    expect(container).toMatchSnapshot();
  });

  it('should render error message', function () {
    const { container, getByText } = render(<Loading error={true} />);

    expect(
      getByText('An Error was encountered loading the page!')
    ).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('should render timeout message', function () {
    const { container, getByText } = render(<Loading timedOut={true} />);

    expect(getByText('The request has timed out!')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});

describe('LoadableContent', function () {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should render with minimum props', function () {
    const { container, getByText } = render(
      <LoadableContent isFetching={false}>
        <div id="jest">jest test</div>
      </LoadableContent>
    );

    expect(getByText('jest test')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  // todo must fix
  xit('should render spinner after timeout', function () {
    const { container, queryByText, getByText } = render(
      <LoadableContent isFetching={true}>
        <div id="jest">jest test</div>
      </LoadableContent>
    );

    expect(getByText('jest test')).toBeTruthy();

    act(() => jest.runOnlyPendingTimers());

    expect(queryByText('jest test')).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
