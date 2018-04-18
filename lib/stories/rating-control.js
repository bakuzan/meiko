import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RatingControl } from 'components';

storiesOf('RatingControl', module)
  .add('basic', () => <RatingControl name="rating" value={4} />)
  .add('with action', () => (
    <RatingControl name="rating" value={4} onChange={action('was selected')} />
  ));