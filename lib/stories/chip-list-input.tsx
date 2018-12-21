import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChipListInput from 'components/ChipListInput';

const options = [
  { text: 'Bat' },
  { text: 'Cat' },
  { text: 'Dingo' },
  { text: 'Earwig' },
  { text: 'Frog' }
];

const selected = options.slice(0, 2);

const actions = {
  updateChipList: action('update list')
};

storiesOf('ChipListInput', module)
  .add('basic', () => (
    <ChipListInput
      attr="text"
      name="tags"
      chipsSelected={selected}
      chipOptions={options}
      {...actions}
    />
  ))
  .add('with createNew', () => (
    <ChipListInput
      attr="text"
      name="tags"
      chipsSelected={selected}
      chipOptions={options}
      {...actions}
      createNew={action('create new')}
    />
  ));
