import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './TabView.scss';

const cx = classNames.bind(styles);

const TabView = ({ isActive, children }) => (
  <div className={cx('tab-view', { active: isActive })} role="tabpanel">
    {children}
  </div>
);

TabView.defaultProps = {
  isActive: false
};

TabView.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default TabView;
