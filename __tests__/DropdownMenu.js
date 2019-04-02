import React from 'react';

import { DropdownMenu } from '../lib';

describe('DropdownMenu', function() {
  it('should render with minimum props', function() {
    const component = shallow(
      <DropdownMenu>
        <li>Test item</li>
        <li>And another one!</li>
      </DropdownMenu>
    );

    expect(component.is('.dropdown-menu')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should display menu on toggler click', function() {
    const component = shallow(
      <DropdownMenu>
        <li>Test item</li>
        <li>And another one!</li>
      </DropdownMenu>
    );

    expect(component.find('.dropdown-menu__menu').exists()).toBe(false);

    component.find('button.dropdown-menu__toggler').simulate('click');

    expect(component.find('.dropdown-menu__menu').exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should close display menu on outside click', function() {
    const component = shallow(
      <DropdownMenu>
        <li>Test item</li>
        <li>And another one!</li>
      </DropdownMenu>
    );

    component.find('button.dropdown-menu__toggler').simulate('click');
    expect(component.find('.dropdown-menu__menu').exists()).toBe(true);

    component.simulate('click');

    expect(component.find('.dropdown-menu__menu').exists()).toBe(false);
    expect(component).toMatchSnapshot();
  });
});
