import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import RequestIndicator from 'RequestIndicator';

storiesOf('RequestIndicator', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <RequestIndicator
      hide={boolean('Hide', false)}
      requestInFlight={boolean('Request In Flight', true)}
    />
  ));
