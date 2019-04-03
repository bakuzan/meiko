import React from 'react';

import { NewTabLink } from '../lib';

it('should render with minimum props', function() {
  const component = shallow(<NewTabLink href="#jest" />);

  expect(component.is('a')).toBeTruthy();
  expect(component).toMatchSnapshot();
});
