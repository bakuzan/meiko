import React from 'react';
import { storiesOf } from '@storybook/react';

import { Loaders } from '../index';

storiesOf('Loaders', module)
  .add('Loading Bouncer - basic', () => <Loaders.LoadingBouncer />)
  .add('Loading Spinner - basic', () => <Loaders.LoadingSpinner />);
