import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, select } from '@storybook/addon-knobs';

import DropdownMenu from 'DropdownMenu';
import { PositionEnum } from 'constants/enums';

storiesOf('DropdownMenu', module)
  .addDecorator(withKnobs)
  .add('basic - left', () => (
    <DropdownMenu id="story" portalTarget="#root" align={PositionEnum.left}>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  ))
  .add('basic - center', () => (
    <DropdownMenu id="story" portalTarget="#root" align={PositionEnum.center}>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  ))
  .add('basic - right', () => (
    <DropdownMenu id="story" portalTarget="#root" align={PositionEnum.right}>
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  ))
  .add('interactive', () => (
    <DropdownMenu
      id="story"
      portalTarget="#root"
      align={select(
        'Align',
        { ...Object.keys(PositionEnum) },
        PositionEnum.Left
      )}
    >
      <li>Test item</li>
      <li>And another one!</li>
    </DropdownMenu>
  ));
