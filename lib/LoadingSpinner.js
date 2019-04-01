import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles/LoadingSpinner';

function LoadingSpinner(props) {
  const hasSize = props.size;
  const sizeClass = `loader--${props.size}`;
  return (
    <div
      className={classNames(
        'loader',
        {
          [sizeClass]: hasSize
        },
        styles.loader,
        hasSize && styles[sizeClass]
      )}
    >
      <svg
        className={classNames('loader__circular', styles.circular)}
        viewBox="25 25 50 50"
      >
        <circle
          className={classNames('loader__path', styles.path)}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}

LoadingSpinner.displayName = 'LoadingSpinner';
LoadingSpinner.propTypes = {
  size: PropTypes.string
};

export default LoadingSpinner;
