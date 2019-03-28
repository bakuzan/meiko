import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

interface ILoadingSpinnerProps {
  size?: string;
}

function LoadingSpinner(props: ILoadingSpinnerProps) {
  return (
    <div
      className={classNames('loader', {
        [`loader--${props.size}`]: props.size
      })}
    >
      <svg className={classNames('loader__circular')} viewBox="25 25 50 50">
        <circle
          className={classNames('loader__path')}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.string
};

export default LoadingSpinner;
