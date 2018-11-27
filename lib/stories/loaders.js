import React from 'react';
import { storiesOf } from '@storybook/react';

import Loaders from 'components/Loaders';

storiesOf('Loaders', module)
  .add('Loading Bouncer - basic', () => <Loaders.LoadingBouncer />)
  .add('Loading Spinner - basic', () => <Loaders.LoadingSpinner />);
