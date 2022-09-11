import React from 'react';

import { Logo } from '../lib';

import textMatcher from './__helpers__/getByTextComplex';

it('should render with minimum props', function () {
  const { container, getByText } = render(<Logo id="jest" text="jest" />);

  expect(getByText(textMatcher('JEST'))).toBeTruthy();
  expect(container).toMatchSnapshot();
});
