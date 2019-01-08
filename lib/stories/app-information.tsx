import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import AppInformation from 'components/AppInformation';

storiesOf('AppInformation', module)
  .addDecorator(withInfo)
  .add('basic', () => <AppInformation branch="branch_name" version="1.0.3" />)
  .add('with no version', () => <AppInformation branch="branch_name" />)
  .add('with no branch', () => <AppInformation version="1.0.3" />)
  .add('with no props', () => <AppInformation />);
