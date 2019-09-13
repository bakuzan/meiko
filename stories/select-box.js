import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import SelectBox from 'SelectBox';
import FC from 'FormControls';

const options = [
  { value: 0, text: 'Select a value' },
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

function SelectBoxStory({ as: customComp, ...props }) {
  const [state, setState] = useContext(MkoContext);
  const Component = customComp || SelectBox;

  return (
    <Component
      id="storyTest"
      text="SelectBox story"
      value={state.value}
      options={options}
      onChange={(e) => setState({ value: e.target.value })}
      {...props}
    />
  );
}

storiesOf('SelectBox', module)
  .addParameters({
    props: { propTables: [SelectBox], propTablesExclude: [SelectBoxStory] },
    mko: { defaultValues: { value: 0 } }
  })
  .add('basic', () => <SelectBoxStory />)
  .add('required', () => <SelectBoxStory required />)
  .add('disabled', () => <SelectBoxStory disabled />)
  .add('custom children', () => (
    <SelectBoxStory>
      <option value={1}>Test</option>
      <option value={2}>Test 2</option>
    </SelectBoxStory>
  ))
  .add('with form control - has error', () => (
    <SelectBoxStory
      as={FC.SelectBox}
      name="storyTest"
      error="This select has an error"
    />
  ));
