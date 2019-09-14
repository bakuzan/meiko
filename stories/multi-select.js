import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import MultiSelect from '@/MultiSelect';

const options = [
  { value: 1, text: 'Gen1' },
  { value: 2, text: 'Gen2' },
  { value: 3, text: 'Gen3' },
  { value: 4, text: 'Gen4' }
];

function MultiSelectStory(props) {
  const [state, setState] = useContext(MkoContext);

  return (
    <MultiSelect
      {...props}
      {...state}
      id="story"
      listClassName="story-list"
      className="meiko-multiselect"
      name="multiSelect"
      placeholder="Select a gen"
      options={options}
      onUpdate={(values) => setState({ values })}
    />
  );
}

storiesOf('MultiSelect', module)
  .addParameters({
    props: {
      propTables: [MultiSelect],
      propTablesExclude: [MultiSelectStory]
    },
    mko: { defaultValues: { values: [] } }
  })
  .add('basic', () => <MultiSelectStory />);
