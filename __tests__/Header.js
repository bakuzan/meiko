import React from 'react';

import { Header } from '../lib';

it('should render with minimum props', function() {
  const component = shallow(<Header />);

  expect(component.is('.application-header')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render title', function() {
  const component = shallow(<Header title="" />);

  let target = component.find('.application-header__title');
  expect(target.exists()).toBe(false);

  component.setProps({ title: 'hello world' });

  target = component.find('.application-header__title');
  expect(target.exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should render navLeft', function() {
  const component = shallow(<Header navLeft="" />);

  let target = component.find('.application-header__links-block');
  expect(target.exists()).toBe(false);

  component.setProps({ navLeft: <div /> });

  target = component.find('.application-header__links-block');
  expect(target.exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should render navRight', function() {
  const component = shallow(<Header navRight="" />);

  let target = component.find('.application-header__links-block');
  expect(target.exists()).toBe(false);

  component.setProps({ navRight: <div /> });

  target = component.find('.application-header__links-block');
  expect(target.exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should left align title', function() {
  const component = shallow(<Header title="Hello" />);

  let target = component.find('.flex-spacer');
  expect(target.length).toEqual(2);

  component.setProps({ leftAlignTitle: true });

  target = component.find('.flex-spacer');
  expect(target.length).toEqual(1);
  expect(component).toMatchSnapshot();
});
