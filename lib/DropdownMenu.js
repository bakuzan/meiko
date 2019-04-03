import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useRef } from 'react';

import { Button } from './Button';
import { Strings, Icons } from './constants';

import styles from './styles/DropdownMenu';
import { useOutsideClick } from './hooks/useOutsideClick';

function DropdownMenu({ id, title, icon, align, children }) {
  const [isDropdownOpen, setOpen] = useState(false);
  const menuParent = useRef();

  const togglerId = id ? `${id}-toggler` : null;
  const menuId = id ? `${id}-menu` : null;

  useOutsideClick(isDropdownOpen && menuParent.current, () => setOpen(false));

  return (
    <div id={id} className={classNames('dropdown-menu', styles.container)}>
      <Button
        id={togglerId}
        className={classNames('dropdown-menu__toggler', styles.toggler)}
        aria-label="Open dropdown menu"
        icon={icon}
        title={title}
        onClick={() => setOpen(true)}
      />
      <div ref={menuParent}>
        {isDropdownOpen && (
          <ul
            id={menuId}
            className={classNames(
              'dropdown-menu__menu',
              styles.menu,
              styles[`menu_${align}`]
            )}
            role="menu"
          >
            <li
              className={classNames(
                'dropdown-menu__arrow',
                styles.arrow,
                styles[`arrow_${align}`]
              )}
            />
            {children}
          </ul>
        )}
      </div>
    </div>
  );
}

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = {
  icon: Icons.settings,
  align: Strings.center
};

DropdownMenu.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  align: PropTypes.oneOf([Strings.left, Strings.center, Strings.right]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default DropdownMenu;
