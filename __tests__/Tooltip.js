import React from 'react';

import { Tooltip } from '../lib';
import { act } from '@testing-library/react';

it('should render with minimum props', function () {
  const { container } = render(<Tooltip text="Tooltip!" />);

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

xit('should add/remove hover class on mouseenter/mouseleave', function () {
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
