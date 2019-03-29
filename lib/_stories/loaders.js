import React from 'react';
import { storiesOf } from '@storybook/react';


import LoadingBouncer from 'LoadingBouncer';
import LoadingSpinner from 'LoadingSpinner';

storiesOf('Loaders', module)
  
  .add('Loading Bouncer - basic', () => <LoadingBouncer />)
  .add('Loading Spinner - basic', () => <LoadingSpinner />);
