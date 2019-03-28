import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import toaster from '_utils/toasterService';
import Toaster from 'Toaster';

let timer;
function toasterStory(funcName) {
  return withInfo()(() => {
    clearTimeout(timer);
    timer = window.setInterval(() => {
      toaster[funcName]('Example', 'This is a toaster message!');
    }, 1000);
    return <Toaster />;
  });
}

storiesOf('Toaster', module)
  .add('info', toasterStory('info'))
  .add('success', toasterStory('success'))
  .add('warning', toasterStory('warning'))
  .add('error', toasterStory('error'));
