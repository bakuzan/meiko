import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import { Button } from 'components/Button/Button';
import Portal from 'components/Portal';
import Backdrop from 'components/Backdrop/Backdrop';
import { Strings, Icons } from 'constants/index';
import { getElementCoordinates } from 'utils/common';
import styles from './DropdownMenu.scss';

const cx = classNames.bind(styles);

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      position: null
    };

    this.handleClose = this.handleClose.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleClose(e) {
    this.setState({ isDropdownOpen: false, position: null });
  }

  toggleDropdown(e) {
    const elementPosition = getElementCoordinates(e.target);

    this.setState(prev => {
      const isDropdownOpen = !prev.isDropdownOpen;
      const position = isDropdownOpen ? elementPosition : null;

      return {
        isDropdownOpen,
        position
      };
    });
  }

  render() {
    const { top, left, right } = this.state.position || {};
    const { id, title, icon, portalTarget, align } = this.props;
    const togglerId = `${id}-toggler`;
    const menuStyle =
      align === Strings.left
        ? { top: `${top}px`, left: `${left}px` }
        : align === Strings.right
          ? { top: `${top}px`, right: `${right}px` }
          : { top: `${top}px` };

    return (
      <div id={id} className={cx('dropdown-container')}>
        <Button
          id={togglerId}
          className={cx('dropdown-toggler')}
          icon={icon}
          title={title}
          onClick={this.toggleDropdown}
        />
        {this.state.isDropdownOpen && (
          <Portal querySelector={portalTarget}>
            <Backdrop id={id} onClickOrKey={this.handleClose} />
            <ul
              id={`${id}-menu`}
              className={cx('dropdown-menu', align)}
              style={menuStyle}
              role="menu"
            >
              <li className={cx('dropdown-arrow')} />
              {this.props.children}
            </ul>
          </Portal>
        )}
      </div>
    );
  }
}

DropdownMenu.defaultProps = {
  icon: Icons.settings,
  portalTarget: 'main',
  align: Strings.center
};

DropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
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
