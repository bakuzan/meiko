import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { DateSelector } from '../index';
import { formatDateForInput } from 'utils/date';

const actions = {
  onChange: action('change date')
};

const TODAY = formatDateForInput(new Date());

storiesOf('DateSelector', module)
  .add('basic', () => <DateSelector name="story" value={TODAY} {...actions} />)
  .add('basic - flat', () => (
    <DateSelector name="story" value={TODAY} isFlat {...actions} />
  ))
  .add('disabled', () => (
    <DateSelector name="story" value={TODAY} disabled={true} {...actions} />
  ))
  .add('disabled - flat', () => (
    <DateSelector
      name="story"
      value={TODAY}
      isFlat
      disabled={true}
      {...actions}
    />
  ));
