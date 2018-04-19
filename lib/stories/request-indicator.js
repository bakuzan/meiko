import React from 'react';
import { storiesOf } from '@storybook/react';

import { RequestIndicator } from '../index';

storiesOf('RequestIndicator', module).add('basic', () => (
  <RequestIndicator hide={false} requestInFlight={true} />
));
