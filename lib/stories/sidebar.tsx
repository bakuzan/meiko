import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Sidebar from 'components/Sidebar';

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

storiesOf('Sidebar', module)
  .addDecorator(withInfo)
  .add('basic', () => (
    <Sidebar
      isHidden={false}
      isCollapsed={false}
      items={menuOptions}
      {...actions}
    />
  ));
