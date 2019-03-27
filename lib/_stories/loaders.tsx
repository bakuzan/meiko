import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Loaders from 'Loaders';

storiesOf('Loaders', module)
  .addDecorator(withInfo)
  .add('Loading Bouncer - basic', () => <Loaders.LoadingBouncer />)
  .add('Loading Spinner - basic', () => <Loaders.LoadingSpinner />);
