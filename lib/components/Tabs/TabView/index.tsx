import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './TabView.scss';

const TabView = ({ isActive, children }: ITabViewProps) => (
  <div className={classNames('tab-view', { active: isActive })} role="tabpanel">
    {children}
  </div>
);

TabView.defaultProps = {
  isActive: false
};

TabView.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default TabView;
