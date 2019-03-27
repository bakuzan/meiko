import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import RadioButton from 'RadioButton';

storiesOf('RadioButton', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <RadioButton
      name="storyTest"
      value="YES"
      label={text('Label', 'Radio Option')}
      checked={boolean('Checked', true)}
      onSelect={action('selected')}
    />
  ));
