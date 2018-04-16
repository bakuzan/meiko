import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Example.scss';

const cx = classNames.bind(styles);

const Example = ({ message = 'this is an alert' }) => (
  <div className={cx('example-container')}>
    <span className={cx('test')}>{message}</span>
  </div>
);

Example.propTypes = {
  message: PropTypes.string
};

export default Example;
