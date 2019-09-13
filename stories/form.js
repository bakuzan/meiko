import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Form from 'Form';
import ClearableInput from 'ClearableInput';
import SelectBox from 'SelectBox';

const cancelOptions = {
  onCancel: action('cancel')
};
const submitOptions = {
  onSubmit: action('submit')
};

const actions = {
  onChange: action('on change')
};

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

function FormStory({ submitOptions, cancelOptions }) {
  return (
    <Form
      name="story-form"
      submitOptions={submitOptions}
      cancelOptions={cancelOptions}
    >
      <ClearableInput label="" value="" {...actions} />
      <SelectBox
        id="storyTest"
        value={2}
        text="SelectBox story"
        options={options}
        onChange={action('selected')}
      />
    </Form>
  );
}

storiesOf('Form', module)
  .addParameters({
    props: {
      propTables: [Form],
      propTablesExclude: [ClearableInput, SelectBox]
    }
  })
  .add('basic', () => (
    <FormStory
      submitOptions={{ ...submitOptions }}
      cancelOptions={{ ...cancelOptions }}
    />
  ))
  .add('custom button text', () => (
    <FormStory
      name="story-form"
      submitOptions={{ ...submitOptions, text: 'Activate' }}
      cancelOptions={{ ...cancelOptions }}
    />
  ))
  .add('no cancel option', () => (
    <FormStory
      name="story-form"
      submitOptions={{ ...submitOptions }}
      cancelOptions={{ ...cancelOptions, hide: true }}
    />
  ));
