import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';

import AutocompleteInput from 'AutocompleteInput';

const initialState = { value: '', selectedId: null };
const list = [
  { id: 5, text: 'Bat' },
  { id: 6, text: 'Cat' },
  { id: 7, text: 'Dingo' },
  { id: 8, text: 'Earwig' },
  { id: 9, text: 'Frog' }
];

storiesOf('AutocompleteInput', module).add(
  'basic',
  withState(initialState)(
    withInfo()(({ store }) => (
      <AutocompleteInput
        id="text"
        attr="text"
        items={list}
        filter={store.state.value}
        onChange={(e) => store.set({ value: e.target.value })}
        onSelect={(selectedId) => store.set({ selectedId })}
      />
    ))
  )
);
