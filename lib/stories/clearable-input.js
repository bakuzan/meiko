import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ClearableInput } from '../index';

const actions = {
  onChange: action('on change')
};

storiesOf('ClearableInput', module).add('basic', () => (
  <ClearableInput value="test value" {...actions} />
));
