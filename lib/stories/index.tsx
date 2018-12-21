import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Example from 'components/Example';

import '../styles/index.scss';

storiesOf('Example', module)
  .add('basic', () => <Example />)
  .add('custom message', () => (
    <Example message="The css is not being loaded" />
  ));

export const storyStyle = {
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '20px'
};
