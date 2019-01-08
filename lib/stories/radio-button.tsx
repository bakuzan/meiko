import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import RadioButton from 'components/RadioButton';

storiesOf('RadioButton', module)
  .addDecorator(withInfo)
  .add('unchecked', () => (
    <RadioButton
      name="storyTest"
      value="YES"
      label="unchecked"
      checked={false}
      onSelect={action('selected')}
    />
  ))
  .add('checked', () => (
    <RadioButton
      name="storyTest"
      value="YES"
      label="checked"
      checked={true}
      onSelect={action('selected')}
    />
  ));
