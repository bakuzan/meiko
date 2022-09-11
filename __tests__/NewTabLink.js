import React from 'react';

import { NewTabLink } from '../lib';

it('should render with minimum props', function () {
  const { container } = render(<NewTabLink href="#jest" />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});
