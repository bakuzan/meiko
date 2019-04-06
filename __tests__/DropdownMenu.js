import React from 'react';
import { act } from 'react-testing-library';

import mockDocumentEventListeners from './__helpers__/documentEventListeners';

import { DropdownMenu } from '../lib';

const { trigger } = mockDocumentEventListeners();

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

xit('should close display menu on outside click', async function() {
  const component = shallow(
    <DropdownMenu>
      <li id="inside">Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  );

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);

  component.find('.dropdown-menu__toggler').simulate('click');
  expect(component.find('.dropdown-menu__menu').exists()).toBe(true);

  component.find('#inside').simulate('click');
  expect(component.find('.dropdown-menu__menu').exists()).toBe(true);

  await act(() => trigger.click({ target: document.body }));

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);
  expect(component).toMatchSnapshot();
});

xit('should close display menu on escape key', async function() {
  const escape = 27;
  const component = shallow(
    <DropdownMenu>
      <li id="inside">Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  );

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);

  component.find('.dropdown-menu__toggler').simulate('click');
  expect(component.find('.dropdown-menu__menu').exists()).toBe(true);

  component.find('#inside').simulate('click');
  expect(component.find('.dropdown-menu__menu').exists()).toBe(true);

  await act(async () => {
    trigger.keydown({ keyCode: escape });
  });

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);
  expect(component).toMatchSnapshot();
});
