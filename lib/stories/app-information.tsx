import * as React from 'react';
import { storiesOf } from '@storybook/react';

import AppInformation from 'components/AppInformation';

storiesOf('AppInformation', module)
  .add('basic', () => <AppInformation branch="branch_name" version="1.0.3" />)
  .add('with no version', () => <AppInformation branch="branch_name" />)
  .add('with no branch', () => <AppInformation version="1.0.3" />)
  .add('with no props', () => <AppInformation />);
