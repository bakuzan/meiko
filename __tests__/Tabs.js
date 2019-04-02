import React from 'react';

import { Tabs } from '../lib';

describe('Tabs', function() {
  it('should render with minimum props', function() {
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

  it('should change active tab', function() {
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

    expect(component.state('activeTab')).toEqual('one');

    component
      .find('.tab-control__button')
      .at(1)
      .simulate('click');

    expect(component.state('activeTab')).toEqual('two');
    expect(component).toMatchSnapshot();
  });

  it('should pass isActive if child is function', function() {
    const component = shallow(
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

    component
      .find('.tab-control__button')
      .at(1)
      .simulate('click');

    expect(component.find('#jest').exists()).toBe(false);
    expect(component).toMatchSnapshot();
  });
});
