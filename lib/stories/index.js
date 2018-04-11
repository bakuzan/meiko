import React from 'react';
import { storiesOf } from '@storybook/react';

import {Example} from 'components/index';

storiesOf('Example', module)
  .add('basic', () => (<Example />))
  .add('custom message', () => (<Example message="The css is not being loaded" />))
