import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import AppInformation from 'components/AppInformation';

storiesOf('AppInformation', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <AppInformation
      branch={text('Branch', 'branch_name')}
      version={text('Version', '1.0.3')}
    />
  ))
  .add('with no version', () => <AppInformation branch="branch_name" />)
  .add('with no branch', () => <AppInformation version="1.0.3" />)
  .add('with no props', () => <AppInformation />);
