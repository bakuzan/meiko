import React from 'react';
import classNames from 'classnames';

import styles from './RequestIndicator.scss';

const cx = classNames.bind(styles);

const RequestIndicator = ({ hide, requestInFlight }) => (
  <div className={cx('request-indicator-container')}>
    {requestInFlight && (
      <div className={cx('request-indicator-loader', { hidden: hide })} />
    )}
  </div>
);

export default RequestIndicator;
