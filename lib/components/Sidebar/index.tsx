import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import Icons from '../../constants/icons';
import { Button } from '../Button';
import SidebarLinkTemplate from './SidebarLinkTemplate';
import './Sidebar.scss';

const Sidebar = ({
  id,
  className,
  isHidden,
  isCollapsed,
  toggleCollapse,
  close,
  ...props
}: ISidebarProps) => {
  const sidebarClasses = classNames('sidebar', className, {
    collapsed: isCollapsed,
    hidden: isHidden
  });
  const LinkTemplate = props.customLinkTemplate
    ? props.customLinkTemplate
    : SidebarLinkTemplate;

  return (
    <div id={id} className={sidebarClasses}>
      <Button
        className={classNames('sidebar-toggler')}
        icon={isCollapsed ? Icons.right : Icons.left}
        onClick={toggleCollapse}
      />
      <ul className={classNames('sidebar-menu')}>
        {props.items.map((option, index) => (
          <li
            key={index}
            className={classNames('sidebar-item')}
            title={option.title}
          >
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
  id: PropTypes.string,
  className: PropTypes.string,
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
