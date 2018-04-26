import React from 'react';
import { storiesOf } from '@storybook/react';

import { Image } from '../index';

storiesOf('Image', module).add('basic - failed image test', () => (
  <Image src="http://bad-url/will-error" alt="error test" />
));
