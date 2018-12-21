import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  render() {
    const {
      id,
      className,
      title,
      navLeft,
      navRight,
      leftAlignTitle,
      ...props
    } = this.props;

    return (
      <nav
        id={id}
        className={classNames('application-header', className)}
        {...props}
      >
        {!!navLeft && (
          <div className={classNames('links-block')}>{navLeft}</div>
        )}
        {!leftAlignTitle && <div className="flex-spacer" />}
        {!!title && <h1>{title}</h1>}
        <div className="flex-spacer" />
        {!!navRight && (
          <div className={classNames('links-block')}>{navRight}</div>
        )}
      </nav>
    );
  }
}

Header.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  leftAlignTitle: PropTypes.bool,
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
