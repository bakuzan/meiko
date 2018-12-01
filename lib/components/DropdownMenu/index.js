import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from '../Button';
import Portal from '../Portal';
import Backdrop from '../Backdrop';
import { Strings, Icons } from '../../constants/index';
import { getElementCoordinates } from '../../utils';

import './DropdownMenu.scss';

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

    this.setState((prev) => {
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
      <div id={id} className={classNames('dropdown-menu-container')}>
        <Button
          id={togglerId}
          className={classNames('dropdown-toggler')}
          icon={icon}
          title={title}
          onClick={this.toggleDropdown}
        />
        {this.state.isDropdownOpen && (
          <Portal querySelector={portalTarget}>
            <ul
              id={`${id}-menu`}
              className={classNames('dropdown-menu', align)}
              style={menuStyle}
              role="menu"
            >
              <li className={classNames('dropdown-arrow')} />
              {this.props.children}
            </ul>
            <Backdrop id={id} onClickOrKey={this.handleClose} />
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
