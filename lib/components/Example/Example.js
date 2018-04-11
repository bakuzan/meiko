import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Example.scss';

console.log(styles)
const Example = ({ message = 'this is an alert' }) => (
  <div className={classNames(styles.Example)}>
    <span>{message}</span>
  </div>
);

Example.propTypes = {
  message: PropTypes.string,
};

export default Example;
