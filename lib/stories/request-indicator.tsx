import * as React from 'react';
import { storiesOf } from '@storybook/react';

import RequestIndicator from 'components/RequestIndicator';

storiesOf('RequestIndicator', module).add('basic', () => (
  <RequestIndicator hide={false} requestInFlight={true} />
));
