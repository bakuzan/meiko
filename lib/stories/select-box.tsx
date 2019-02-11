import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withState } from '@dump247/storybook-state';

import SelectBox from 'components/SelectBox';
import { CenterDecorator } from 'stories';

const options = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' }
];

storiesOf('SelectBox', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withInfo)
  .add(
    'basic',
    withState({ value: 2 })(({ store }) => (
      <SelectBox
        name="storyTest"
        value={store.state.value}
        text="SelectBox story"
        options={options}
        onSelect={(e: any) => store.set({ value: e.target.value })}
      />
    ))
  );
