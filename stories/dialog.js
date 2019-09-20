import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MkoContext } from 'mko-book';

import Dialog from '@/Dialog';
import { Button } from '@/Button';

function DialogStory({ children, ...props }) {
  const [state, setState] = useContext(MkoContext);

  return (
    <div>
      <Dialog
        {...props}
        isOpen={state.isOpen}
        name="story"
        onCancel={() => setState({ isOpen: false })}
        tabTrapProps={{ firstId: 'firstId', lastId: 'lastId' }}
      >
        <p>This is a dialog!</p>
        {children}
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
  ))
  .add('with form fields', () => (
    <DialogStory hasBackdrop onAction={action('User Submit')}>
      <input type="text" id="firstId" />
      <input type="checkbox" />
      <select>
        <option value="hello">hello</option>
        <option value="goodbye">goodbye</option>
      </select>
      <input type="text" id="lastId" />
    </DialogStory>
  ));
