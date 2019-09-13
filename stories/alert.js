import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import Alert from 'Alert';

const alerts = (type) => [
  {
    id: '1',
    type,
    message: 'story test',
    detail: 'some extra text here to give more'
  }
];

const actions = {
  dismissAlertMessage: action('dismiss message')
};

storiesOf('Alert', module)
  .addParameters({ props: { propTables: [Alert] } })
  .add('error', () => <Alert alerts={alerts('error')} actions={actions} />)
  .add('warning', () => <Alert alerts={alerts('warning')} actions={actions} />)
  .add('information', () => <Alert alerts={alerts('info')} actions={actions} />)
  .add('success', () => <Alert alerts={alerts('success')} actions={actions} />);
