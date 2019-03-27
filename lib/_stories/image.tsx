import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Image from 'components/Image';

storiesOf('Image', module)
  .addDecorator(withInfo)
  .add('basic - failed image test', () => (
    <Image src="https://bad-url/will-error" alt="error test" />
  ));
