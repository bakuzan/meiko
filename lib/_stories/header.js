import React from 'react';
import { storiesOf } from '@storybook/react';


import Header from 'Header';

storiesOf('Header', module)
  
  .add('basic', () => <Header />)
  .add('with title', () => <Header title="This is a title, that is centered" />)
  .add('with nav left', () => <Header navLeft={<a>LOGO</a>} />)
  .add('with nav right', () => (
    <Header
      navRight={
        <div>
          <a key="1">Some Link</a>
          <a key="2">another</a>
          <a key="3">three for good luck</a>
        </div>
      }
    />
  ))
  .add('with all props', () => (
    <Header
      title="Header Story"
      navLeft={<div>HOME</div>}
      navRight={
        <div>
          <a key="1">Some Link</a>
          <a key="2">another</a>
          <a key="3">three for good luck</a>
        </div>
      }
    />
  ));
