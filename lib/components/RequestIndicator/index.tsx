import * as React from 'react';
import classNames from 'classnames';

import './RequestIndicator.scss';

interface IRequestIndicatorProps {
  hide: boolean;
  requestInFlight: boolean;
}

const RequestIndicator = ({
  hide,
  requestInFlight
}: IRequestIndicatorProps) => (
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
