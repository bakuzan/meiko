import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import SelectBox from 'components/SelectBox';

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

storiesOf('SelectBox', module)
  .addDecorator(withInfo)
  .add('basic', () => (
    <SelectBox
      name="storyTest"
      value={2}
      text="SelectBox story"
      options={options}
      onSelect={action('selected')}
    />
  ));
