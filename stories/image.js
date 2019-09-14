import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from '@/Image';

const offPageStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  height: '1500px'
};

storiesOf('Image', module)
  .add('load image', () => (
    <Image src="https://i.imgur.com/5hLv07N.jpg" alt="loaded" />
  ))
  .add('lazy load image', () => (
    <div style={offPageStyle}>
      <Image isLazy src="https://i.imgur.com/5hLv07N.jpg" alt="lazy loaded" />
    </div>
  ))
  .add('on load error', () => (
    <Image src="https://bad-url/will-error" alt="error test" />
  ));
