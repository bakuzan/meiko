import React from 'react';

import { Tooltip } from '../lib';

it('should render with minimum props', function() {
  const component = shallow(<Tooltip text="Tooltip!" />);

  expect(component.is('.tooltip')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

// TODO
// Add more tests
