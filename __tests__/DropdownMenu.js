import React from 'react';

import mountWithOutsideClick from './__utils__/mountWithOutsideClick';

import { DropdownMenu } from '../lib';

afterEach(() => jest.restoreAllMocks());

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
  const component = mount(
    <DropdownMenu>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  );

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);

  component.find('button.dropdown-menu__toggler').simulate('click');

  expect(component.find('.dropdown-menu__menu').exists()).toBe(true);
  expect(component).toMatchSnapshot();
  component.unmount();
});

xit('should close display menu on outside click', function() {
  const { component, mockOutsideClick } = mountWithOutsideClick(
    <div>
      <div id="jest" />
      <DropdownMenu>
        <li id="inside">Test item</li>
        <li>And another one!</li>
      </DropdownMenu>
    </div>,
    '.dropdown-menu'
  );

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);

  component.find('button.dropdown-menu__toggler').simulate('click');
  expect(component.find('.dropdown-menu__menu').exists()).toBe(true);

  component.find('#inside').simulate('click');
  expect(component.find('.dropdown-menu__menu').exists()).toBe(true);

  mockOutsideClick();

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);
  expect(component).toMatchSnapshot();
  component.unmount();
});
