import React from 'react';
import { storiesOf } from '@storybook/react';



import Dialog from 'Dialog';
import { Button } from 'Button';

let DIALOG_ELEMENT = null;
storiesOf('Dialog', module)
  
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
