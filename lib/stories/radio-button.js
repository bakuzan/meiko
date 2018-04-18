import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { RadioButton } from 'components';

storiesOf('RadioButton', module)
  .add('unchecked', () => (
    <RadioButton
      name="storyTest"
      value="YES"
      checked={false}
      onSelect={action('selected')}
    />
  ))
  .add('checked', () => (
    <RadioButton
      name="storyTest"
      value="YES"
      checked={true}
      onSelect={action('selected')}
    />
  ));
