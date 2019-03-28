import React from 'react';
// import { storiesOf } from '@storybook/react';

import './styles/index.scss';

// storiesOf('Index', module).add('basic', () => <div>Exists to load styles</div>);

export const storyStyle = {
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '20px'
};

const styles = { display: 'flex', justifyContent: 'center', marginTop: '30px' };
export const CenterDecorator = (storyFn) => (
  <div style={styles}>{storyFn()}</div>
);
