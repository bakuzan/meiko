import classNames from 'classnames'
import React from 'react';

import styles from './LoadingBouncer.scss';
console.log(styles)
const LoadingBouncer = () => (
  <div className={classNames(styles.loading_bouncer)}>
    <div />
    <div />
    <div />
  </div>
);

export default LoadingBouncer;
