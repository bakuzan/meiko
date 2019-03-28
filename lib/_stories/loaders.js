import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import LoadingBouncer from 'LoadingBouncer';
import LoadingSpinner from 'LoadingSpinner';

storiesOf('Loaders', module)
  .addDecorator(withInfo)
  .add('Loading Bouncer - basic', () => <LoadingBouncer />)
  .add('Loading Spinner - basic', () => <LoadingSpinner />);
