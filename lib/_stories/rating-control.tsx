import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import RatingControl from 'RatingControl';

storiesOf('RatingControl', module)
  .addDecorator(withInfo)
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
    withState({ value: 'Hello, World' })(
      withInfo()(({ store }) => (
        <RatingControl
          id="rating"
          name="rating"
          value={store.state.value}
          label={text('Label', '')}
          onChange={(e: any) => store.set({ value: e.target.value })}
        />
      ))
    )
  );
