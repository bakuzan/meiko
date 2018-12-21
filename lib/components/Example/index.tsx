import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './Example.scss';

const Example = ({ message = 'this is an alert' }) => (
  <div className={classNames('example-container')}>
    <span className={classNames('test')}>{message}</span>
  </div>
);

Example.propTypes = {
  message: PropTypes.string
};

export default Example;
