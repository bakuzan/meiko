import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Header from 'components/Header';

storiesOf('Header', module)
  .addDecorator(withInfo)
  .add('basic', () => <Header />)
  .add('with title', () => <Header title="This is a title, that is centered" />)
  .add('with nav left', () => <Header navLeft={<a>LOGO</a>} />)
  .add('with nav right', () => (
    <Header
      navRight={
        <React.Fragment>
          <a key="1">Some Link</a>
          <a key="2">another</a>
          <a key="3">three for good luck</a>
        </React.Fragment>
      }
    />
  ))
  .add('with all props', () => (
    <Header
      title="Header Story"
      navLeft={<div>HOME</div>}
      navRight={
        <React.Fragment>
          <a key="1">Some Link</a>
          <a key="2">another</a>
          <a key="3">three for good luck</a>
        </React.Fragment>
      }
    />
  ));
