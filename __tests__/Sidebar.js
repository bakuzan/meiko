import React from 'react';

import { Sidebar } from '../lib';

describe('Sidebar', function() {
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
  const mockClose = jest.fn();

  afterEach(() => jest.resetAllMocks());

  it('should render with minimum props', function() {
    const component = shallow(
      <Sidebar
        isHidden={false}
        isCollapsed={false}
        items={menuOptions}
        toggleCollapse={mockToggle}
        close={mockClose}
      />
    );

    expect(component.is('.sidebar')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it('should apply hidden styles', function() {
    const component = shallow(
      <Sidebar
        isHidden={false}
        isCollapsed={false}
        items={menuOptions}
        toggleCollapse={mockToggle}
        close={mockClose}
      />
    );

    expect(component.is('.sidebar--hidden')).toBe(false);

    component.setProps({ isHidden: true });

    expect(component.is('.sidebar--hidden')).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should apply collapsed styles', function() {
    const component = shallow(
      <Sidebar
        isHidden={false}
        isCollapsed={false}
        items={menuOptions}
        toggleCollapse={mockToggle}
        close={mockClose}
      />
    );

    expect(component.is('.sidebar--collapsed')).toBe(false);

    component.setProps({ isCollapsed: true });

    expect(component.is('.sidebar--collapsed')).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('should call toggleCollapse', function() {
    const component = mount(
      <Sidebar
        isHidden={false}
        isCollapsed={false}
        items={menuOptions}
        toggleCollapse={mockToggle}
        close={mockClose}
      />
    );

    component.find('button.sidebar__toggler').simulate('click');
    expect(mockToggle).toHaveBeenCalled();
  });

  it('should call close on default link click', function() {
    const component = mount(
      <Sidebar
        isHidden={false}
        isCollapsed={false}
        items={menuOptions}
        toggleCollapse={mockToggle}
        close={mockClose}
      />
    );

    component
      .find('a.sidebar-link')
      .at(0)
      .simulate('click');
    expect(mockClose).toHaveBeenCalled();
  });
});
