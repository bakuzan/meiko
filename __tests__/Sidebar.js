import React from 'react';

import { Sidebar } from '../lib';

const menuOptions = [
  {
    link: 'fake/link',
    title: 'One',
    icon: 'A'
  },
  {
    link: 'fake/link',
    title: 'Two',
    icon: 'B'
  },
  {
    link: 'fake/link',
    title: 'Three',
    icon: 'C'
  }
];

const mockToggle = jest.fn();
const mockClose = jest.fn((e) => e.preventDefault());

afterEach(() => jest.resetAllMocks());

it('should render with minimum props', function () {
  const { container } = render(
    <Sidebar
      isHidden={false}
      isCollapsed={false}
      items={menuOptions}
      toggleCollapse={mockToggle}
      close={mockClose}
    />
  );

  expect(container.firstChild).toBeTruthy();
  expect(container).toMatchSnapshot();
});

it('should apply hidden styles', function () {
  const { container, getByTestId, rerender } = render(
    <Sidebar
      isHidden={false}
      isCollapsed={false}
      items={menuOptions}
      toggleCollapse={mockToggle}
      close={mockClose}
    />
  );

  const sidebarElement = container.firstChild;
  expect(sidebarElement.className.includes('sidebar--hidden')).toBe(false);

  rerender(
    <Sidebar
      isHidden={true}
      isCollapsed={false}
      items={menuOptions}
      toggleCollapse={mockToggle}
      close={mockClose}
    />
  );

  expect(sidebarElement.className.includes('sidebar--hidden')).toBe(true);
  expect(container).toMatchSnapshot();
});

it('should apply collapsed styles', function () {
  const { container, getByTestId, rerender } = render(
    <Sidebar
      isHidden={false}
      isCollapsed={false}
      items={menuOptions}
      toggleCollapse={mockToggle}
      close={mockClose}
    />
  );

  const sidebarElement = container.firstChild;
  expect(sidebarElement.className.includes('sidebar--collapsed')).toBe(false);

  rerender(
    <Sidebar
      isHidden={false}
      isCollapsed={true}
      items={menuOptions}
      toggleCollapse={mockToggle}
      close={mockClose}
    />
  );

  expect(sidebarElement.className.includes('sidebar--collapsed')).toBe(true);
  expect(container).toMatchSnapshot();
});

it('should call toggleCollapse', async function () {
  const { getByLabelText } = render(
    <Sidebar
      isHidden={false}
      isCollapsed={false}
      items={menuOptions}
      toggleCollapse={mockToggle}
      close={mockClose}
    />
  );

  const user = userEvent.setup();
  await user.click(getByLabelText('Toggle sidebar'));

  expect(mockToggle).toHaveBeenCalled();
});

it('should call close on default link click', async function () {
  const { getByText } = render(
    <Sidebar
      isHidden={false}
      isCollapsed={false}
      items={menuOptions}
      toggleCollapse={mockToggle}
      close={mockClose}
    />
  );

  const user = userEvent.setup();
  await user.click(getByText('One'));

  expect(mockClose).toHaveBeenCalled();
});
