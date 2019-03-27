import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import Tickbox from 'components/Tickbox';

storiesOf('Tickbox', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <Tickbox
      text={text('Text', 'Tickbox Option')}
      id="tick"
      checked={boolean('Checked', true)}
      disabled={boolean('Disabled', false)}
      onChange={action('changed')}
    />
  ));
