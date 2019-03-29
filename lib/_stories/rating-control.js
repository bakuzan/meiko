import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import { withKnobs, number, text } from '@storybook/addon-knobs';

import RatingControl from 'RatingControl';

storiesOf('RatingControl', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <RatingControl
      id="rating"
      name="rating"
      value={number('Rating', 4)}
      label={text('Label', '')}
    />
  ))
  .add(
    'with action',
    withState({ value: 'Hello, World' })(({ store }) => (
      <RatingControl
        id="rating"
        name="rating"
        value={store.state.value}
        label={text('Label', '')}
        onChange={(e) => store.set({ value: e.target.value })}
      />
    ))
  );
