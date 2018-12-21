import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import './LoadingSpinner.scss';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={classNames('loader', 'meiko-spinner', this.props.size)}>
        <svg className={classNames('circular')} viewBox="25 25 50 50">
          <circle
            className={classNames('path')}
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
}

LoadingSpinner.propTypes = {
  size: PropTypes.string
};

export default LoadingSpinner;
