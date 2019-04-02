import React from 'react';

import { NewTabLink } from '../lib';

describe('NewTabLink', function() {
  it('should render with minimum props', function() {
    const component = shallow(<NewTabLink href="#jest" />);

    expect(component.is('a')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
