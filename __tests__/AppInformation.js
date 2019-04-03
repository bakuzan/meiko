import React from 'react';

import { AppInformation } from '../lib';

it('should render null when no props', function() {
  const component = shallow(<AppInformation branch="" version="" />);
  expect(component.html()).toBeNull();
});

it('should render when branch present', function() {
  const spanContent = ['Branch: master'];
  const component = shallow(<AppInformation branch="master" />);

  expect(component.is('.app-information')).toBe(true);

  component
    .find('.app-information__detail > span')
    .forEach((span, i) => expect(span.text()).toEqual(spanContent[i]));

  expect(component).toMatchSnapshot();
});

it('should render when version present', function() {
  const spanContent = ['Version: 4.0.0'];
  const component = shallow(<AppInformation version="4.0.0" />);

  expect(component.is('.app-information')).toBe(true);

  component
    .find('.app-information__detail > span')
    .forEach((span, i) => expect(span.text()).toEqual(spanContent[i]));

  expect(component).toMatchSnapshot();
});

it('should render both', function() {
  const spanContent = ['Branch: master', 'Version: 4.0.0'];
  const component = shallow(<AppInformation branch="master" version="4.0.0" />);

  expect(component.is('.app-information')).toBe(true);

  component
    .find('.app-information__detail > span')
    .forEach((span, i) => expect(span.text()).toEqual(spanContent[i]));

  expect(component).toMatchSnapshot();
});
