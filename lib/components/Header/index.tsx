import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Navbar, LinkBlock } from './styles';
import { FlexSpacer } from '../../styles/generic';

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
    <Navbar
      id={id}
      className={classNames('application-header', className)}
      {...props}
    >
      {!!navLeft && (
        <LinkBlock className={classNames('links-block')}>{navLeft}</LinkBlock>
      )}
      {!leftAlignTitle && <FlexSpacer className="flex-spacer" />}
      {!!title && <h1>{title}</h1>}
      <FlexSpacer className="flex-spacer" />
      {!!navRight && (
        <LinkBlock className={classNames('links-block')}>{navRight}</LinkBlock>
      )}
    </Navbar>
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
