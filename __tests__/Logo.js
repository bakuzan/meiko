import React from 'react';

import { Logo } from '../lib';

it('should render with minimum props', function() {
  const component = mount(<Logo id="jest" text="jest" />);

  expect(component.is('#jest')).toBeTruthy();
  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should render each letter separately', function() {
  const text = 'jest';
  const component = mount(<Logo text={text} />);

  component
    .find('.logo__letter')
    .forEach((l, i) =>
      expect(l.text()).toEqual(text.toUpperCase().slice(i, i + 1))
    );
  component.unmount();
});

it('should render capitalised text', function() {
  const component = mount(<Logo text="jest" />);

  expect(component.find('.logo__word').text()).toEqual('JEST');
  component.unmount();
});
