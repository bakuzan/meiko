import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { MkoContext } from 'mko-book';

import ClearableInput from 'ClearableInput';
import FC from 'FormControls';

function ClearableInputStory({ as: customComponent, ...props }) {
  const [state, setState] = useContext(MkoContext);
  const Component = customComponent || ClearableInput;

  return (
    <Component
      id="story_ClearableInput"
      label="Storybook Input"
      value={state.value}
      onChange={(e) => setState({ value: e.target.value })}
      {...props}
    />
  );
}

storiesOf('ClearableInput', module)
  .addParameters({
    props: {
      propTables: [ClearableInput],
      propTablesExclude: [ClearableInputStory]
    },
    mko: { defaultValues: { value: '' } }
  })
  .add('text field with length limit', () => (
    <ClearableInputStory maxLength={10} />
  ))
  .add('number field with min', () => (
    <ClearableInputStory
      type="number"
      min={0}
      maxNumberText={(props) => `Over ${props.min}`}
    />
  ))
  .add('number field with max', () => (
    <ClearableInputStory type="number" max={10} />
  ))
  .add('number field with min and max', () => (
    <ClearableInputStory
      type="number"
      min={0}
      max={10}
      maxNumberText={(props) => `Over ${props.min}, but under ${props.max}`}
    />
  ))
  .add('required', () => <ClearableInputStory required />)
  .add('disabled', () => <ClearableInputStory disabled />)
  .add('as form control - has error', () => (
    <ClearableInputStory
      as={FC.ClearableInput}
      name="storyTest"
      error="The input is invalid"
    />
  ));
