import React from 'react';
import { storiesOf } from '@storybook/react';

import toaster from 'utils/toaster';
import Toaster from 'components/Toaster';

let timer;
function toasterStory(funcName) {
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      toaster[funcName]('Example', 'This is a toaster message!');
    }, 1000);
    return <Toaster />;
  };
}

storiesOf('Toaster', module)
  .add('info', toasterStory('info'))
  .add('success', toasterStory('success'))
  .add('warning', toasterStory('warning'))
  .add('error', toasterStory('error'));
