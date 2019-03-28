import * as React from 'react';
import classNames from 'classnames';

import styles from './_styles/RequestIndicator';

export interface IRequestIndicatorProps {
  hide: boolean;
  requestInFlight: boolean;
}

const RequestIndicator = ({
  hide,
  requestInFlight
}: IRequestIndicatorProps) => (
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
