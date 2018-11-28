import React from 'react';
import classNames from 'classnames';

import './RequestIndicator.scss';

const RequestIndicator = ({ hide, requestInFlight }) => (
  <div
    className={classNames(
      'request-indicator-container',
      'meiko-request-indicator'
    )}
  >
    {requestInFlight && (
      <div
        className={classNames('request-indicator-loader', { hidden: hide })}
      />
    )}
  </div>
);

export default RequestIndicator;
