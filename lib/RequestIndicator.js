import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './styles/RequestIndicator';

const RequestIndicator = ({ hide, requestInFlight }) => (
  <div className={classNames('request-indicator', styles.indicator)}>
    {requestInFlight && (
      <div
        data-testid="requestIndicator"
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

RequestIndicator.displayName = 'RequestIndicator';
RequestIndicator.propTypes = {
  hide: PropTypes.bool,
  requestInFlight: PropTypes.bool
};
export default RequestIndicator;
