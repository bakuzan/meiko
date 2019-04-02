import React from 'react';

import { Alert } from '../lib';

describe('Alert', function() {
  const mockFn = jest.fn();
  const actions = {
    dismissAlertMessage: mockFn
  };

  const alerts = [
    {
      id: 1,
      type: 'error',
      message: 'Test message',
      detail: 'More words'
    }
  ];

  afterEach(() => jest.resetAllMocks());

  it('should render null when no alerts present', function() {
    const component = shallow(<Alert alerts={[]} actions={actions} />);
    expect(component.html()).toBeNull();
  });

  it('should render container when has alerts', function() {
    const component = shallow(<Alert alerts={alerts} actions={actions} />);

    expect(component.is('.alert-container')).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should call remove on close button click', function() {
    const component = mount(<Alert alerts={alerts} actions={actions} />);

    component.find('button.alert__close').simulate('click');

    expect(mockFn).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should expand alert on click', function() {
    const component = mount(<Alert alerts={alerts} actions={actions} />);

    expect(component.find('.alert__content--is-expanded').exists()).toBeFalsy();
    expect(component).toMatchSnapshot();

    component.find('button.alert__expand').simulate('click');

    expect(
      component.find('.alert__content--is-expanded').exists()
    ).toBeTruthy();
    expect(component).toMatchSnapshot();
    component.unmount();
  });
});
