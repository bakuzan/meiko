import React from 'react';

import { Tooltip } from '../lib';
import { act } from 'react-testing-library';

it('should render with minimum props', function() {
  const component = shallow(<Tooltip text="Tooltip!" />);

  expect(component.is('.tooltip')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

xit('should add/remove hover class on mouseenter/mouseleave', function() {
  const component = mount(<Tooltip text="Tooltip!" />);

  let classNameIncludesHover = component
    .find('.tooltip__content')
    .prop('className')
    .includes('tooltipContent__hovered');

  expect(classNameIncludesHover).toBe(false);

  act(() => {
    component.find('.tooltip').prop('onMouseEnter')({
      clientX: 10,
      clientY: 10
    });
  });

  classNameIncludesHover = component
    .find('.tooltip__content')
    .prop('className')
    .includes('tooltipContent__hovered');

  expect(classNameIncludesHover).toBe(true);

  expect(component).toMatchSnapshot();
});
