import React from 'react';
import classNames from 'classnames';

import styles from './_styles/RequestIndicator';

const RequestIndicator = ({ hide, requestInFlight }) => (
  <div className={classNames('request-indicator', styles.indicator)}>
    {requestInFlight && (
      <div
        className={classNames(
          'request-indicator__loader',
          {
            'request-indicator__loader--hidden': hide
          },
          styles.loader,
          hide && styles.loader_hidden
        )}
      />
    )}
  </div>
);

export default RequestIndicator;
