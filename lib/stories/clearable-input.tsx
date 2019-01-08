import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';
import { withInfo } from '@storybook/addon-info';

import ClearableInput from 'components/ClearableInput';

function ClearableInputStory() {
  return (
    <div>
      {withState({ value: 'Hello, World' })(
        withInfo()(({ store }) => (
          <ClearableInput
            value={store.state.value}
            onChange={(e: any) => store.set({ value: e.target.value })}
          />
        ))
      )()}
    </div>
  );
}

storiesOf('ClearableInput', module).add('basic', () => ClearableInputStory());
