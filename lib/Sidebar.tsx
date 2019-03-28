import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import Icons from './_constants/icons';
import { Button } from './Button';
import SidebarLinkTemplate, {
  ISidebarLink,
  ISidebarLinkProps
} from './SidebarLinkTemplate';

import styles from './_styles/Sidebar';

export interface ISidebarProps {
  id?: string;
  className?: string;
  isHidden: boolean;
  isCollapsed: boolean;
  items: ISidebarLink[];
  customLinkTemplate?(props: ISidebarLinkProps): JSX.Element;
  toggleCollapse(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  close(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const Sidebar = ({
  className,
  isHidden,
  isCollapsed,
  toggleCollapse,
  close,
  items,
  customLinkTemplate: LinkTemplate,
  ...props
}: ISidebarProps) => {
  const sidebarClasses = classNames(
    'sidebar',
    {
      'sidebar--collapsed': isCollapsed,
      'sidebar--hidden': isHidden
    },
    className,
    styles.sidebar,
    isCollapsed && styles.sidebar_collapsed,
    isHidden && styles.sidebar_hidden
  );

  return (
    <div className={sidebarClasses} {...props}>
      <Button
        className={classNames('sidebar__toggler', styles.sidebar__toggler)}
        aria-label="Toggle sidebar"
        icon={isCollapsed ? Icons.right : Icons.left}
        onClick={toggleCollapse}
      />
      <ul className={classNames('sidebar__menu', styles.sidebar__menu)}>
        {items.map((option, index) => (
          <li
            key={index}
            className={classNames('sidebar__item', styles.sidebar__item)}
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
  items: [],
  customLinkTemplate: SidebarLinkTemplate
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
