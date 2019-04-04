import React from 'react';

import { Toaster, toaster } from '../lib';

jest.useFakeTimers();

beforeAll(() => {
  Date.now = jest.fn(() => new Date('2019-04-04').getTime());
});

afterAll(() => jest.restoreAllMocks());

it('should render with minimum props', function() {
  const component = shallow(<Toaster />);

  expect(component.is('.toaster')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should render toasts when popped', function() {
  const component = shallow(<Toaster />);

  toaster.info('jest', 'this is a test');

  expect(component.find('.toast').exists()).toBe(true);
  expect(component).toMatchSnapshot();
});

it('should remove toasts on click', function() {
  const component = shallow(<Toaster />);

  toaster.info('jest', 'this is a test');

  component.find('.toast').simulate('click');

  expect(component.find('.toast').exists()).toBe(false);
  expect(component).toMatchSnapshot();
});

xit('should remove toasts after 3sec', function() {
  const component = shallow(<Toaster />);

  toaster.info('jest', 'this is a test');
  jest.advanceTimersByTime(3100);

  expect(component.find('.toast').exists()).toBe(false);
  expect(component).toMatchSnapshot();
});
