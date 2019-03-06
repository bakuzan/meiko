import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';
import './Header.scss';

export interface IHeaderProps {
  id?: string;
  className?: string;
  title?: string;
  leftAlignTitle?: boolean;
  navLeft?: JSX.Element;
  navRight?: JSX.Element;
}

const Header = ({
  id,
  className,
  title,
  navLeft,
  navRight,
  leftAlignTitle,
  ...props
}: IHeaderProps) => {
  return (
    <nav
      id={id}
      className={classNames('application-header', className)}
      {...props}
    >
      {!!navLeft && <div className={classNames('links-block')}>{navLeft}</div>}
      {!leftAlignTitle && <div className="flex-spacer" />}
      {!!title && <h1>{title}</h1>}
      <div className="flex-spacer" />
      {!!navRight && (
        <div className={classNames('links-block')}>{navRight}</div>
      )}
    </nav>
  );
};

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
