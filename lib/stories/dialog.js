import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dialog from 'components/Dialog';
import { Button } from 'components/Button';

class PageWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.getRef = this.getRef.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }
  getRef(el) {
    this.dialog = el;
  }
  openDialog() {
    action('open')({ message: 'you can pass data to dialog' });
    this.dialog.showModal();
  }
  render() {
    return (
      <div>
        <Button onClick={this.openDialog}>Click me!</Button>
        <Dialog name="story" getDialogRef={this.getRef}>
          <p>This is a dialog!</p>
        </Dialog>
      </div>
    );
  }
}

storiesOf('Dialog', module).add('basic', () => {
  return <PageWrapper />;
});
