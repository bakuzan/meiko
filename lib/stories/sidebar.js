import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Sidebar } from '../index';

const actions = {
  toggleCollapse: action('toggle collapse'),
  close: action('close')
};

const menuOptions = [
  {
    link: 'fake/link',
    title: 'One',
    icon: 'A'
  },
  {
    link: 'fake/link',
    title: 'Two',
    icon: 'B'
  },
  {
    link: 'fake/link',
    title: 'Three',
    icon: 'C'
  }
];

storiesOf('Sidebar', module).add('basic', () => (
  <Sidebar
    isHidden={false}
    isCollapsed={false}
    items={menuOptions}
    {...actions}
  />
));
