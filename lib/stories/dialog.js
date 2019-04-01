import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MkoContext } from 'mko-book';

import Dialog from 'Dialog';
import { Button } from 'Button';

function DialogStory(props) {
  const [state, setState] = useContext(MkoContext);

  return (
    <div>
      <Dialog
        {...props}
        isOpen={state.isOpen}
        name="story"
        onClose={() => setState({ isOpen: false })}
      >
        <p>This is a dialog!</p>
      </Dialog>
      <Button onClick={() => setState({ isOpen: true })}>Click me!</Button>
    </div>
  );
}

storiesOf('Dialog', module)
  .addParameters({
    props: {
      propTables: [Dialog],
      propTablesExclude: [DialogStory, Button]
    },
    mko: {
      defaultValues: { isOpen: false }
    }
  })
  .add('with simple notification', () => <DialogStory />)
  .add('with user action', () => (
    <DialogStory hasBackdrop onAction={action('User Submit')} />
  ));
