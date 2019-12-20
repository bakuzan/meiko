import * as React from 'react';

import {
  addOutsideClick,
  fetchFromServer,
  getTagChipSize,
  getWindowScrollPosition,
  resolveErrorMessage,
  toaster,
  ToasterService,
  Toast
} from './index';

addOutsideClick(document.createElement('div'), () => null);

fetchFromServer('url/test');
fetchFromServer('url/test', 'POST', { test: 'payload' });

getTagChipSize(
  [
    { name: 'test1', count: 4 },
    { name: 'test2', count: 3 },
    { name: 'test3', count: 1 }
  ],
  4
);

getWindowScrollPosition();

resolveErrorMessage('an error');
resolveErrorMessage({ test: 'the error' }, 'test');
resolveErrorMessage(new Map([['test', 'the error']]), 'test');

class TestComponent extends React.Component {
  constructor(props: any) {
    super(props);

    const t = new ToasterService();
    t.register(this);
  }
  popToast(t: Toast & { time: number }) {
    // do something
  }
  render() {
    return null;
  }
}

toaster.popToast({ type: 'INFO', title: '', message: '' });
toaster.info('', '');
toaster.success('', '');
toaster.warning('', '');
toaster.error('', '');
