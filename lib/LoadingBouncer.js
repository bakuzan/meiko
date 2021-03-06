import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import styles from './styles/LoadingBouncer';

function LoadingBouncer({ className }) {
  const orbs = Array(3).fill(null);
  return (
    <div className={classNames('loading-bouncer', styles.bouncer, className)}>
      {orbs.map((_, i) => (
        <div
          key={i}
          className={classNames('loading-bouncer__orb', styles.orb, {
            [`${className}__orb`]: className
          })}
        />
      ))}
    </div>
  );
}

LoadingBouncer.displayName = 'LoadingBouncer';
LoadingBouncer.propTypes = {
  className: PropTypes.string
};
export default LoadingBouncer;
