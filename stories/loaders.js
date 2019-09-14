import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import { SimpleLoading, Loading } from '@/Loadable';
import LoadingContent from '@/LoadableContent';
import LoadingBouncer from '@/LoadingBouncer';
import LoadingSpinner from '@/LoadingSpinner';

storiesOf('Loading Bouncer', module).add('basic', () => <LoadingBouncer />);

storiesOf('Loading Spinner', module)
  .add('basic', () => <LoadingSpinner />)
  .add('control', () => (
    <div style={{ position: 'relative', height: '50px' }}>
      <LoadingSpinner size="control" />
    </div>
  ))
  .add('fullscreen', () => <LoadingSpinner size="fullscreen" />);

storiesOf('LoadingContent', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <LoadingContent
      isFetching={boolean('Is Fetching', false)}
      spinnerSize={select(
        'Icon',
        { none: '', control: 'control', fullscreen: 'fullscreen' },
        ''
      )}
    >
      Some child content
    </LoadingContent>
  ));

storiesOf('SimplerLoading', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <SimpleLoading pastDelay={boolean('Past Delay', false)} />
  ));

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Loading
      error={boolean('Error', false)}
      timedOut={boolean('Timed out', false)}
      pastDelay={boolean('Past Delay', false)}
    />
  ));
