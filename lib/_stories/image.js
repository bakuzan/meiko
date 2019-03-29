import React from 'react';
import { storiesOf } from '@storybook/react';


import Image from 'Image';

storiesOf('Image', module)
  
  .add('basic - failed image test', () => (
    <Image src="https://bad-url/will-error" alt="error test" />
  ));
