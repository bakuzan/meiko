import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { Component } from 'react';
import styles from './Header.scss';

const cx = classNames.bind(styles);

class Header extends Component {
  render() {
    const { title, navLeft, navRight } = this.props;
    return (
      <nav className={cx('application-header')}>
        {!!navLeft && <div id="navigation-links-left">{navLeft}</div>}
        <div className="flex-spacer" />
        {!!title && <h1>{title}</h1>}
        <div className="flex-spacer" />
        {!!navRight && <div id="navigation-links-right">{navRight}</div>}
      </nav>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  navLeft: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  navRight: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Header;
