import classNames from 'classnames';
import * as React from 'react';

import { Loader, Orb } from './styles';

const LoadingBouncer = ({ className }) => (
  <Loader className={classNames('loading-bouncer', 'meiko-bouncer', className)}>
    <Orb className="loading-bouncer__orb" />
    <Orb className="loading-bouncer__orb" />
    <Orb className="loading-bouncer__orb" />
  </Loader>
);

export default LoadingBouncer;
