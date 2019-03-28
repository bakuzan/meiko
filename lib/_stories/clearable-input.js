import React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';
import {
  withKnobs,
  text,
  number,
  select,
  boolean
} from '@storybook/addon-knobs';

import ClearableInput from 'ClearableInput';
import { CenterDecorator } from '_stories';

function ClearableInputStory(props) {
  return (
    <div>
      {withState({ value: '' })(
        withInfo()(({ store }) => (
          <ClearableInput
            value={store.state.value}
            onChange={(e) => store.set({ value: e.target.value })}
            {...props}
          />
        ))
      )()}
    </div>
  );
}

storiesOf('ClearableInput', module)
  .addDecorator(withKnobs)
  .addDecorator(CenterDecorator)
  .add(
    'basic',
    () =>
      ClearableInputStory({
        type: select(
          'Type',
          { Text: 'text', Number: 'number', Date: 'date' },
          'text',
          'Type'
        ),
        label: text('Label', '', 'General'),
        disabled: boolean('Disabled', false, 'General'),
        maxLength: number('Max Length', 140, 'Type-Text'),
        max: number('Max Number', 0, 'Type-Number')
      }),
    {
      knobs: {
        timestamps: true
      }
    }
  );
