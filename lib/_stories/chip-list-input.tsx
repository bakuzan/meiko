import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';

import ChipListInput from 'ChipListInput';

const options = [
  { id: 1, text: 'Bat' },
  { id: 2, text: 'Cat' },
  { id: 3, text: 'Dingo' },
  { id: 4, text: 'Earwig' },
  { id: 5, text: 'Frog' }
];

const selected = options.slice(0, 2);

storiesOf('ChipListInput', module)
  .add(
    'basic',
    withState({ list: selected })(
      withInfo()(({ store }) => (
        <ChipListInput
          id="tags"
          attr="text"
          name="tags"
          chipsSelected={store.state.list}
          chipOptions={options}
          updateChipList={(_, list) => store.set({ list })}
        />
      ))
    )
  )
  .add(
    'with createNew',
    withState({ list: selected, options })(
      withInfo()(({ store }) => (
        <ChipListInput
          id="tags"
          attr="text"
          name="tags"
          chipsSelected={store.state.list}
          chipOptions={store.state.options}
          updateChipList={(_, list) => store.set({ list })}
          createNew={(data) =>
            store.set({
              options: [
                ...store.state.options,
                { id: store.state.options.length + 1, ...data }
              ]
            })
          }
        />
      ))
    )
  )
  .add(
    'with createNew custom message',
    withState({ list: selected, options })(
      withInfo()(({ store }) => (
        <ChipListInput
          id="tags"
          attr="text"
          name="tags"
          chipsSelected={store.state.list}
          chipOptions={store.state.options}
          updateChipList={(_, list) => store.set({ list })}
          createNew={(data) =>
            store.set({
              options: [
                ...store.state.options,
                { id: store.state.options.length + 1, ...data }
              ]
            })
          }
          createNewMessage="Are you sure you want to create a new tag?"
        />
      ))
    )
  );
