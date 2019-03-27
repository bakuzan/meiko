import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import Tabs from 'components/Tabs';

storiesOf('Tabs', module)
  .addDecorator(withInfo)
  .add('basic', () => (
    <Tabs.TabContainer>
      <Tabs.TabView name="one">
        <div>this is the first tab...</div>
      </Tabs.TabView>
      <Tabs.TabView name="two">
        <div>...and this is another tab</div>
      </Tabs.TabView>
    </Tabs.TabContainer>
  ))
  .add('with on change callback', () => (
    <Tabs.TabContainer onChange={action('tab is active')}>
      <Tabs.TabView name="one">
        <div>this is the first tab...</div>
      </Tabs.TabView>
      <Tabs.TabView name="two">
        <div>...and this is another tab</div>
      </Tabs.TabView>
    </Tabs.TabContainer>
  ))
  .add('with render props view children', () => (
    <Tabs.TabContainer>
      <Tabs.TabView name="one">
        {(isActive: boolean) => isActive && <div>this is the first tab...</div>}
      </Tabs.TabView>
      <Tabs.TabView name="two">
        {(isActive: boolean) =>
          isActive && <div>...and this is another tab</div>
        }
      </Tabs.TabView>
    </Tabs.TabContainer>
  ));
