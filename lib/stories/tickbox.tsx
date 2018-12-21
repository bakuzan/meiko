import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Tickbox from 'components/Tickbox';

storiesOf('Tickbox', module).add('basic', () => (
  <Tickbox name="tick" checked={true} onChange={action('changed')} />
));
