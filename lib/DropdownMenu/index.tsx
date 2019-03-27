import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from '../Button';
import Portal from '../Portal';
import Backdrop from '../Backdrop';
import { Strings, Icons } from '../../constants/index';
import { PositionEnum } from 'constants/enums';
import { getElementCoordinates } from '../../utils';
import { IElementCoordinates, IJSXChildren } from 'types';

import './DropdownMenu.scss';

interface IDropdownMenuProps {
  id?: string;
  title?: string;
  icon: string;
  portalTarget: string;
  align?: PositionEnum;
  children: IJSXChildren;
}
interface IDropdownMenuState {
  isDropdownOpen: boolean;
  position: IElementCoordinates;
}

class DropdownMenu extends React.Component<
  IDropdownMenuProps,
  IDropdownMenuState
> {
  static defaultProps = {
    icon: Icons.settings,
    portalTarget: 'main',
    align: Strings.center
  };

  static propTypes = {
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

  constructor(props: IDropdownMenuProps) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      position: null
    };

    this.handleClose = this.handleClose.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleClose() {
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
    const { top, left, right } = this.state.position || {
      top: 0,
      left: 0,
      right: 0
    };
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
          aria-label="Open dropdown"
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

export default DropdownMenu;
