import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Alert from 'components/Alert';

const alerts = [
  {
    id: '1',
    type: 'error',
    message: 'story test',
    detail: 'some extra text here to give more'
  }
];

const actions = {
  dismissAlertMessage: action('dismiss message')
};

storiesOf('Alert', module).add(
  'basic',
  () => <Alert alerts={alerts} actions={actions} />,
  { info: { inline: true } }
);
