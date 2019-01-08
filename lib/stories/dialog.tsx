import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { withInfo } from '@storybook/addon-info';

import Dialog from 'components/Dialog';
import { Button } from 'components/Button';

let DIALOG_ELEMENT = null;
storiesOf('Dialog', module)
  .addDecorator(withInfo)
  .add(
    'basic',
    function DialogStory() {
      return (
        <div>
          <Dialog name="story" getDialogRef={(el) => (DIALOG_ELEMENT = el)}>
            <p>This is a dialog!</p>
          </Dialog>
          <Button onClick={() => DIALOG_ELEMENT.showModal()}>Click me!</Button>
        </div>
      );
    },
    {
      info: {
        propTablesExclude: [Button]
      }
    }
  );
