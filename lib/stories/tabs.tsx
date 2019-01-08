import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

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
  ));
