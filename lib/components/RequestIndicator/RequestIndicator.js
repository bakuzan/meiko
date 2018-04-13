import React from 'react';
import classNames from 'classnames';

import './RequestIndicator.css';

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
