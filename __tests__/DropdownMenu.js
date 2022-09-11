import React from 'react';
import { act } from '@testing-library/react';

import mockDocumentEventListeners from './__helpers__/documentEventListeners';

import { DropdownMenu } from '../lib';

const { trigger } = mockDocumentEventListeners();

afterEach(() => jest.restoreAllMocks());

it('should render with minimum props', function () {
  const { container } = render(
    <DropdownMenu>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should display menu on toggler click', async function () {
  const { container, queryByText, getByText, getByLabelText } = render(
    <DropdownMenu>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  );

  expect(queryByText('Test item')).toBeNull();

  const user = userEvent.setup();
  await user.click(getByLabelText('Open dropdown menu'));

  expect(getByText('Test item')).toBeTruthy();
  expect(container).toMatchSnapshot();
});

xit('should close display menu on outside click', async function () {
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

xit('should close display menu on escape key', async function () {
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

  act(() => {
    trigger.keydown({ keyCode: escape });
  });

  expect(component.find('.dropdown-menu__menu').exists()).toBe(false);
  expect(component).toMatchSnapshot();
});
