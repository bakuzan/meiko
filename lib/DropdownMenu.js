import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useRef } from 'react';

import { Button } from './Button';
import { Strings, Icons } from './constants';

import styles from './styles/DropdownMenu';
import { useOutsideClick } from './hooks/useOutsideClick';
import { useDebounce } from './hooks/useDebounce';

function DropdownMenu({
  id,
  className,
  icon = Icons.settings,
  align = Strings.center,
  children,
  ...props
}) {
  const [isDropdownOpen, setOpen] = useState(false);
  const menuParent = useRef();

  const togglerId = id ? `${id}-toggler` : null;
  const menuId = id ? `${id}-menu` : null;
  const isFnChildren = typeof children === 'function';

  const closeMenu = () => setOpen(false);
  const debounceIsDropdownOpen = useDebounce(isDropdownOpen);
  const element = debounceIsDropdownOpen ? menuParent.current : null;
  useOutsideClick(element, closeMenu);

  return (
    <div
      id={id}
      className={classNames('dropdown-menu', styles.container, className)}
    >
      <Button
        id={togglerId}
        className={classNames('dropdown-menu__toggler', styles.toggler)}
        aria-label="Open dropdown menu"
        icon={icon}
        {...props}
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
            {isFnChildren ? children(closeMenu) : children}
          </ul>
        )}
      </div>
    </div>
  );
}

DropdownMenu.displayName = 'DropdownMenu';

DropdownMenu.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  align: PropTypes.oneOf([Strings.left, Strings.center, Strings.right]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export default DropdownMenu;
