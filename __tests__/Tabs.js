import React from 'react';

import { Tabs } from '../lib';

it('should render with minimum props', function () {
  const component = shallow(
    <Tabs.Container>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  );

  expect(component.is('.tabs')).toBeTruthy();
  expect(component).toMatchSnapshot();
});

it('should change active tab', function () {
  const component = mount(
    <Tabs.Container>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  );

  expect(component.find('.tab-view').at(0).hasClass('tab-view--active')).toBe(
    true
  );

  component.find('button.tab-control__button').at(1).simulate('click');

  expect(component.find('.tab-view').at(1).hasClass('tab-view--active')).toBe(
    true
  );

  expect(component).toMatchSnapshot();
  component.unmount();
});

it('should pass isActive if child is function', function () {
  const component = mount(
    <Tabs.Container>
      <Tabs.View name="one">
        {(isActive) =>
          isActive && <div id="jest">this is the first tab...</div>
        }
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  );

  expect(component.find('#jest').exists()).toBe(true);

  component.find('button.tab-control__button').at(1).simulate('click');

  expect(component.find('#jest').exists()).toBe(false);
  expect(component).toMatchSnapshot();
  component.unmount();
});
