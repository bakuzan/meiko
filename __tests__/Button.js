import React from 'react';

import { Button } from '../lib';

describe('Button', function() {
  const mockFn = jest.fn();

  afterEach(() => jest.resetAllMocks());

  it('should render when no props', function() {
    const component = shallow(<Button />);
    expect(component.is('.button--standard')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should pass on click', function() {
    const component = shallow(<Button onClick={mockFn} />);

    component.find('.button').simulate('click');

    expect(component.is('.button--standard')).toBeTruthy();
    expect(mockFn).toHaveBeenCalled();
  });

  it('should render apply style class', function() {
    const component = shallow(<Button btnStyle="primary" />);
    expect(component.is('.button--standard')).toBeTruthy();
    expect(component.is('.button--primary')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should render apply size class', function() {
    const component = shallow(<Button btnSize="small" />);
    expect(component.is('.button--standard')).toBeTruthy();
    expect(component.is('.button--small')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should render apply link class', function() {
    const component = shallow(<Button link />);
    expect(component.is('.button--standard')).toBeFalsy();
    expect(component.is('.button--link')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should render apply icon class', function() {
    const component = shallow(<Button icon="T" />);
    expect(component.is('.button--standard')).toBeFalsy();
    expect(component.is('.button--icon')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
