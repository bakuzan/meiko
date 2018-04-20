import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import Portal from 'components/Portal';
import Icons from 'constants/icons';
import Enums from 'constants/enums';
import styles from './DropdownMenu.scss';

const cx = classNames.bind(styles);

const CLICK_EVENT = 'click';
const CLOSE_KEYS = [Enums.keyCode.escape, Enums.keyCode.enter];

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleClose(e) {
    console.log(e.type, e.keyCode, CLOSE_KEYS);
    if (e.type !== CLICK_EVENT && !CLOSE_KEYS.includes(e.keyCode)) return;
    this.setState({ isDropdownOpen: false });
  }

  toggleDropdown(e) {
    console.log('toggle', e.type);
    this.setState(prev => ({ isDropdownOpen: !prev.isDropdownOpen }));
  }

  render() {
    const { id, title, icon, portalTarget } = this.props;
    const togglerId = `${id}-toggler`;

    return (
      <div id={id} className={cx('dropdown-container')}>
        <input
          type="checkbox"
          value={this.state.isDropdownOpen}
          id={togglerId}
          name={id}
          className={cx('dropdown-toggler')}
          onChange={this.toggleDropdown}
          tabIndex="0"
        />
        <label icon={icon} htmlFor={togglerId} title={title} />
        {this.state.isDropdownOpen && (
          <Portal querySelector={portalTarget}>
            <div
              id={`${id}-backdrop`}
              className={cx('dropdown-backdrop')}
              role="button"
              tabIndex="0"
              onClick={this.handleClose}
              onKeyDown={this.handleClose}
            />
            <ul id={`${id}-menu`} className={cx('dropdown-menu')} role="menu">
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
  portalTarget: 'main'
};

DropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  icon: PropTypes.string,
  portalTarget: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default DropdownMenu;
