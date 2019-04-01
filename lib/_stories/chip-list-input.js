import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import ChipListInput from 'ChipListInput';

const options = [
  { id: 1, text: 'Bat' },
  { id: 2, text: 'Cat' },
  { id: 3, text: 'Dingo' },
  { id: 4, text: 'Earwig' },
  { id: 5, text: 'Frog' }
];

const selected = options.slice(0, 2);

function ChipListInputStory(props) {
  const [state, setState] = useContext(MkoContext);

  return (
    <ChipListInput
      id="tags"
      attr="text"
      name="tags"
      chipsSelected={state.list}
      chipOptions={options}
      updateChipList={(_, list) => setState({ list })}
      {...props}
    />
  );
}

storiesOf('ChipListInput', module)
  .addParameters({
    props: {
      propTables: [ChipListInput],
      propTablesExclude: [ChipListInputStory]
    },
    mko: { defaultValues: { list: selected } }
  })
  .add('basic', () => <ChipListInputStory />)
  .add('with createNew', () => (
    <ChipListInputStory
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
  .add('with createNew custom message', () => (
    <ChipListInputStory
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
  ));
