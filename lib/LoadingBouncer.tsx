import classNames from 'classnames';
import * as React from 'react';

import styles from './_styles/LoadingBouncer';

function LoadingBouncer({ className }) {
  const orbs = Array(3).fill(null);
  return (
    <div className={classNames('loading-bouncer', styles.bouncer, className)}>
      {orbs.map(() => (
        <div
          className={classNames('loading-bouncer__orb', styles.orb, {
            [`${className}__orb`]: className
          })}
        />
      ))}
    </div>
  );
}

export default LoadingBouncer;
