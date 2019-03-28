import React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

import SelectBox from 'SelectBox';

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

storiesOf('SelectBox', module)
  .addDecorator(withInfo)
  .add(
    'basic',
    withState({ value: 2 })(({ store }) => (
      <SelectBox
        id="storyTest"
        value={store.state.value}
        text="SelectBox story"
        options={options}
        onSelect={(e) => store.set({ value: e.target.value })}
      />
    ))
  );
