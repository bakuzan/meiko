import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Circular, Loader, Path } from './styles';

interface ILoadingSpinnerProps {
  size?: string;
}

class LoadingSpinner extends React.Component<ILoadingSpinnerProps, any> {
  static propTypes = {
    size: PropTypes.string
  };

  render() {
    return (
      <Loader
        className={classNames('loader', 'meiko-spinner', this.props.size)}
      >
        <Circular className={classNames('circular')} viewBox="25 25 50 50">
          <Path
            className={classNames('path')}
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </Circular>
      </Loader>
    );
  }
}

export default LoadingSpinner;
