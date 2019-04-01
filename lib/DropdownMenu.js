import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useRef } from 'react';

import { Button } from './Button';
import Portal from './Portal';
import { Strings, Icons } from './_constants';

import { getElementCoordinates } from './_utils';

import styles from './_styles/DropdownMenu';
import { useOutsideClick } from './_hooks/useOutsideClick';

const defaultPosition = {
  top: 0,
  left: 0,
  right: 0
};

function DropdownMenu({ id, title, icon, portalTarget, align, children }) {
  const menuParent = useRef();
  const [isDropdownOpen, setOpen] = useState(false);
  const [pos, setPosition] = useState(defaultPosition);

  useOutsideClick(isDropdownOpen && menuParent.current, () => {
    setOpen(false);
    setPosition(defaultPosition);
  });

  const togglerId = id ? `${id}-toggler` : null;
  const menuId = id ? `${id}-menu` : null;
  const menuStyle =
    align === Strings.left
      ? { top: `${pos.top}px`, left: `${pos.left}px` }
      : align === Strings.right
      ? { top: `${pos.top}px`, right: `${pos.right}px` }
      : { top: `${pos.top}px` };

  function openDropdown(e) {
    const elementPosition = getElementCoordinates(e.target);
    setOpen(true);
    setPosition(elementPosition);
  }

  return (
    <div id={id} className={classNames('dropdown-menu')}>
      <Button
        id={togglerId}
        className={classNames('dropdown-menu__toggler')}
        aria-label="Open dropdown menu"
        icon={icon}
        title={title}
        onClick={openDropdown}
      />

      <Portal querySelector={portalTarget}>
        <div ref={menuParent}>
          {isDropdownOpen && (
            <ul
              id={menuId}
              className={classNames(
                'dropdown-menu__menu',
                styles.menu,
                styles[`menu_${align}`]
              )}
              style={menuStyle}
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
      </Portal>
    </div>
  );
}

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenu.defaultProps = {
  icon: Icons.settings,
  portalTarget: 'main',
  align: Strings.center
};

DropdownMenu.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  portalTarget: PropTypes.string,
  align: PropTypes.oneOf([Strings.left, Strings.center, Strings.right]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default DropdownMenu;
