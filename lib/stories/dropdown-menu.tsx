import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import DropdownMenu from 'components/DropdownMenu';
import { PositionEnum } from 'constants/enums';
import { CenterDecorator } from 'stories';

storiesOf('DropdownMenu', module)
  .addDecorator(withInfo)
  .addDecorator(CenterDecorator)
  .add('basic - left', () => (
    <DropdownMenu id="story" portalTarget="#root" align={PositionEnum.Left}>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  ))
  .add('basic - center', () => (
    <DropdownMenu id="story" portalTarget="#root" align={PositionEnum.Center}>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  ))
  .add('basic - right', () => (
    <DropdownMenu id="story" portalTarget="#root" align={PositionEnum.Right}>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  ));
