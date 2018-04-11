import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames/bind';
import styles from './Example.css';

const cx = cn.bind(styles);
console.log(styles)
const Example = ({ message = 'this is an alert' }) => (
  <div className={cx(styles["example-container"])}>
    <span>{message}</span>
  </div>
);

Example.propTypes = {
  message: PropTypes.string,
};

export default Example;
