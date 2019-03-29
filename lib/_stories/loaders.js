import React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingBouncer from 'LoadingBouncer';
import LoadingSpinner from 'LoadingSpinner';

storiesOf('Loading Bouncer', module).add('basic', () => <LoadingBouncer />);

storiesOf('Loading Spinner', module)
  .add('basic', () => <LoadingSpinner />)
  .add('Fullscreen', () => <LoadingSpinner size="fullscreen" />);
