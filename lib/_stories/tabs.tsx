import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import { TabContainer, TabView } from 'Tabs';

storiesOf('Tabs', module)
  .addDecorator(withInfo)
  .add('basic', () => (
    <TabContainer>
      <TabView name="one">
        <div>this is the first tab...</div>
      </TabView>
      <TabView name="two">
        <div>...and this is another tab</div>
      </TabView>
    </TabContainer>
  ))
  .add('with on change callback', () => (
    <TabContainer onChange={action('tab is active')}>
      <TabView name="one">
        <div>this is the first tab...</div>
      </TabView>
      <TabView name="two">
        <div>...and this is another tab</div>
      </TabView>
    </TabContainer>
  ))
  .add('with render props view children', () => (
    <TabContainer>
      <TabView name="one">
        {(isActive: boolean) => isActive && <div>this is the first tab...</div>}
      </TabView>
      <TabView name="two">
        {(isActive: boolean) =>
          isActive && <div>...and this is another tab</div>
        }
      </TabView>
    </TabContainer>
  ));
