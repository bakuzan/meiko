import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import Icons from 'constants/icons';
import Button from 'components/Button/Button';
import SidebarLinkTemplate from './SidebarLinkTemplate';
import styles from './Sidebar.scss';

const cx = classNames.bind(styles);

const Sidebar = ({
  isHidden,
  isCollapsed,
  toggleCollapse,
  close,
  ...props
}) => {
  const sidebarClasses = cx({
    collapsed: isCollapsed,
    hidden: isHidden
  });
  const LinkTemplate = props.customLinkTemplate
    ? props.customLinkTemplate
    : SidebarLinkTemplate;

  return (
    <div id="sidebar" className={sidebarClasses}>
      <Button
        id="sidebar-toggler"
        icon={isCollapsed ? Icons.right : Icons.left}
        onClick={toggleCollapse}
      />
      <ul id="sidebar-menu">
        {props.items.map((option, index) => (
          <li key={index} className={cx('sidebar-item')} title={option.title}>
            <LinkTemplate data={option} onClick={close} />
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.defaultProps = {
  items: []
};

Sidebar.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      title: PropTypes.string,
      icon: PropTypes.string
    })
  ),
  customLinkTemplate: PropTypes.func,
  toggleCollapse: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default Sidebar;
