import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import SelectBox from 'SelectBox';

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

function SelectBoxStory() {
  const [state, setState] = useContext(MkoContext);

  return (
    <SelectBox
      id="storyTest"
      text="SelectBox story"
      value={state.value}
      options={options}
      onChange={(e) => setState({ value: e.target.value })}
    />
  );
}

storiesOf('SelectBox', module)
  .addParameters({
    props: { propTables: [SelectBox], propTablesExclude: [SelectBoxStory] },
    mko: { defaultValues: { value: 2 } }
  })
  .add('basic', () => <SelectBoxStory />);
