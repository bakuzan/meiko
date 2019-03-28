import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

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

storiesOf('Form', module)
  .addDecorator(withInfo)
  .add('basic', () => (
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
        onSelect={action('selected')}
      />
    </Form>
  ));
