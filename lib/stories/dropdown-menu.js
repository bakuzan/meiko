import React from 'react';
import { storiesOf } from '@storybook/react';

import { DropdownMenu } from '../index';

storiesOf('DropdownMenu', module)
  .add('basic - left', () => (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
    >
      <DropdownMenu id="story" portalTarget="#root" align="left">
        <li>Test item</li>
        <li>And another one!</li>
      </DropdownMenu>
    </div>
  ))
  .add('basic - center', () => (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
    >
      <DropdownMenu id="story" portalTarget="#root" align="center">
        <li>Test item</li>
        <li>And another one!</li>
      </DropdownMenu>
    </div>
  ))
  .add('basic - right', () => (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}
    >
      <DropdownMenu id="story" portalTarget="#root" align="right">
        <li>Test item</li>
        <li>And another one!</li>
      </DropdownMenu>
    </div>
  ));
