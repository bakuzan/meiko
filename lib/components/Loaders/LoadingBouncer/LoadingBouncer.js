import classNames from 'classnames/bind';
import React from 'react';

import styles from './LoadingBouncer.scss';

const cx = classNames.bind(styles);

const LoadingBouncer = () => (
  <div className={cx('loading-bouncer')}>
    <div />
    <div />
    <div />
  </div>
);

export default LoadingBouncer;
