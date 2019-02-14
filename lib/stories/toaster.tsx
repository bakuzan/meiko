import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import toaster from 'utils/toaster';
import Toaster from 'components/Toaster';

let timer;
function toasterStory(funcName) {
  return withInfo()(() => {
    clearTimeout(timer);
    timer = setInterval(() => {
      toaster[funcName]('Example', 'This is a toaster message!');
    }, 5000);

    return <Toaster />;
  });
}

storiesOf('Toaster', module)
  .add('info', toasterStory('info'))
  .add('success', toasterStory('success'))
  .add('warning', toasterStory('warning'))
  .add('error', toasterStory('error'));
