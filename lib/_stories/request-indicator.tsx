import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import RequestIndicator from 'RequestIndicator';

storiesOf('RequestIndicator', module)
  .addDecorator(withInfo)
  .add('basic', () => <RequestIndicator hide={false} requestInFlight={true} />);
