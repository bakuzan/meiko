import React from 'react';
import classNames from 'classnames';

import styles from './RequestIndicator.scss';

const cx = classNames.bind(styles);

const RequestIndicator = ({ hide, requestInFlight }) => (
  <div id="request-indicator-container">
    {requestInFlight && (
      <div
        id="request-indicator-loader"
        className={cx({ hidden: hide })}
      />
    )}
  </div>
);

export default RequestIndicator;
