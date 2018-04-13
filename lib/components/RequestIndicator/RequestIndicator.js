import React from 'react';
import classNames from 'classnames';

import styles from './RequestIndicator.scss';

const RequestIndicator = ({ hide, requestInFlight }) => (
  <div id="request-indicator-container">
    {requestInFlight && (
      <div
        id="request-indicator-loader"
        className={classNames({ hidden: hide })}
      />
    )}
  </div>
);

export default RequestIndicator;
