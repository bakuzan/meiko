import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import toaster from '_utils/toasterService';
import Toaster from 'Toaster/Toaster';

let timer: number;
function toasterStory(funcName: string) {
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
