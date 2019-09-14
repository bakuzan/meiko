import React from 'react';
import { storiesOf } from '@storybook/react';

import toaster from '@/utils/toasterService';
import Toaster from '@/Toaster';
import { Button } from '@/Button';

storiesOf('Toaster', module).add('toaster options', () => (
  <div>
    <Toaster />
    <Button
      onClick={() =>
        toaster.info('Information', 'Use to tell the user something')
      }
    >
      Send Information
    </Button>
    <Button onClick={() => toaster.warning('Warning', 'Use to alert the user')}>
      Send Warning
    </Button>
    <Button
      onClick={() =>
        toaster.success(
          'Success',
          'Use to tell the user that an action succeeded'
        )
      }
    >
      Send Success
    </Button>
    <Button
      onClick={() =>
        toaster.error('Success', 'Use to tell the user that an action failed')
      }
    >
      Send Error
    </Button>
  </div>
));
