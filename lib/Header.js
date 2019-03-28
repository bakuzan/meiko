import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import styles from './_styles/Header';

const Header = ({
  className,
  title,
  navLeft,
  navRight,
  leftAlignTitle,
  ...props
}) => {
  return (
    <nav
      className={classNames(
        'application-header',
        styles.applicationHeader,
        className
      )}
      {...props}
    >
      {!!navLeft && (
        <div
          className={classNames(
            'application-header__links-block',
            styles.linksBlock
          )}
        >
          {navLeft}
        </div>
      )}
      {!leftAlignTitle && <div className="flex-spacer" />}
      {!!title && <h1 className="application-header__title">{title}</h1>}
      <div className="flex-spacer" />
      {!!navRight && (
        <div
          className={classNames(
            'application-header__links-block',
            styles.linksBlock
          )}
        >
          {navRight}
        </div>
      )}
    </nav>
  );
};

Header.propTypes = {
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
