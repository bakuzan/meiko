import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import AutocompleteInput from 'AutocompleteInput';

const initialState = { value: '', selectedId: null };
const list = [
  { id: 5, text: 'Bat' },
  { id: 6, text: 'Cat' },
  { id: 7, text: 'Dingo' },
  { id: 8, text: 'Earwig' },
  { id: 9, text: 'Frog' }
].map((o) => ({ ...o, text: `${o.text} (id: ${o.id})` }));

function AutocompleteStory() {
  const [state, setState] = useContext(MkoContext);
  return (
    <AutocompleteInput
      id="text"
      attr="text"
      items={list}
      filter={state.value}
      onChange={(e) => setState({ value: e.target.value })}
      onSelect={(selectedId) => setState({ selectedId })}
    />
  );
}

storiesOf('AutocompleteInput', module)
  .addParameters({
    props: {
      propTables: [AutocompleteInput],
      propTablesExclude: [AutocompleteStory]
    },
    mko: { defaultValues: { ...initialState } }
  })
  .add('basic', () => <AutocompleteStory />);
