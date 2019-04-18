import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Tabs from 'Tabs';

storiesOf('Tabs', module)
  .add('basic', () => (
    <Tabs.Container>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
        <button onClick={action('1')}>1</button>
        <button onClick={action('2')}>2</button>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
        <button onClick={action('3')}>3</button>
        <button onClick={action('4')}>4</button>
      </Tabs.View>
    </Tabs.Container>
  ))
  .add('with on change callback', () => (
    <Tabs.Container onChange={action('tab is active')}>
      <Tabs.View name="one">
        <div>this is the first tab...</div>
      </Tabs.View>
      <Tabs.View name="two">
        <div>...and this is another tab</div>
      </Tabs.View>
    </Tabs.Container>
  ))
  .add('with render props view children', () => (
    <Tabs.Container>
      <Tabs.View name="one">
        {(isActive) => isActive && <div>this is the first tab...</div>}
      </Tabs.View>
      <Tabs.View name="two">
        {(isActive) => isActive && <div>...and this is another tab</div>}
      </Tabs.View>
    </Tabs.Container>
  ));
