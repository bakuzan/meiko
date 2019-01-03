import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ChipListInput from 'components/ChipListInput';

const options = [
  { id: 1, text: 'Bat' },
  { id: 2, text: 'Cat' },
  { id: 3, text: 'Dingo' },
  { id: 4, text: 'Earwig' },
  { id: 5, text: 'Frog' }
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
