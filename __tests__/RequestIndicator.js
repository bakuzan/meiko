import React from 'react';

import { RequestIndicator } from '../lib';

it('should render with minimum props', function() {
  const component = shallow(<RequestIndicator />);

  expect(component.is('.request-indicator')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render loader', function() {
  const component = shallow(<RequestIndicator requestInFlight={false} />);

  expect(component.find('.request-indicator__loader').exists()).toBe(false);

  component.setProps({ requestInFlight: true });

  expect(component.find('.request-indicator__loader').exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should apply hide styles to loader', function() {
  const component = shallow(<RequestIndicator requestInFlight={true} />);

  let hasHiddenClass = component
    .find('.request-indicator__loader')
    .hasClass('request-indicator__loader--hidden');

  expect(hasHiddenClass).toBe(false);

  component.setProps({ hide: true });

  hasHiddenClass = component
    .find('.request-indicator__loader')
    .hasClass('request-indicator__loader--hidden');

  expect(hasHiddenClass).toBe(true);
  expect(component).toMatchSnapshot();
});
