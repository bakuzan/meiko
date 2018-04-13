import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Example.scss';

const Example = ({ message = 'this is an alert' }) => (
  <div className={classNames(styles.example_container)}>
    <span className={classNames(styles.test)}>{message}</span>
  </div>
);

Example.propTypes = {
  message: PropTypes.string
};

export default Example;
