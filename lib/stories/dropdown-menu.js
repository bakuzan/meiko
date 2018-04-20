import React from 'react';
import { storiesOf } from '@storybook/react';

import { DropdownMenu } from '../index';

storiesOf('DropdownMenu', module).add('basic', () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
    <DropdownMenu id="story" portalTarget="#root" align="left">
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  </div>
));
