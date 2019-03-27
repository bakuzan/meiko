import * as React from 'react';

import '../styles/index.scss';

export const storyStyle = {
  maxWidth: '300px',
  margin: 'auto',
  marginTop: '20px'
};

const styles = { display: 'flex', justifyContent: 'center', marginTop: '30px' };
export const CenterDecorator = (storyFn) => (
  <div style={styles}>{storyFn()}</div>
);
