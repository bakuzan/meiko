import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DateSelector } from '../index';
import { formatDateForInput } from 'utils/date';

const actions = {
  onChange: action('change date')
};

const TODAY = formatDateForInput(new Date());

storiesOf('DateSelector', module).add('basic', () => (
  <DateSelector name="story" value={TODAY} {...actions} />
));
