/** @jsx jsx */
import { jsx, SerializedStyles } from '@emotion/core';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ITheme } from 'styles';
import { styles, bgStyles, theming } from './styles';

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  btnStyle?: string;
  btnSize?: string;
  link?: boolean;
  rounded?: boolean;
  depress?: boolean;
  icon?: string;
}

function getButtonClasses({
  css,
  btnStyle,
  btnSize,
  link,
  rounded,
  depress,
  icon
}: IButtonProps) {
  const hasBtnSize = !!btnSize;
  const hasLink = !!link;
  const hasIcon = !!icon;

  return (theme: ITheme) =>
    [
      styles.ButtonBase,
      !hasLink && !hasIcon && styles.Button,
      hasLink && styles.ButtonLink,
      hasIcon && styles.ButtonIcon,
      hasBtnSize && styles.ButtonIconSmall,
      rounded && styles.Rounded,
      depress && styles.Depressed,
      css,
      !hasLink && theming(btnStyle, theme)
    ] as SerializedStyles[];
}

export const Button = ({
  btnStyle,
  btnSize,
  link,
  rounded,
  depress,
  css,
  children,
  ...props
}: IButtonProps) => {
  const buttonClasses = getButtonClasses({
    css,
    btnStyle,
    btnSize,
    link,
    rounded,
    depress,
    icon: props.icon
  });

  return (
    <button css={buttonClasses} {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  type: PropTypes.string,
  btnStyle: PropTypes.oneOf(['primary', 'accent']),
  btnSize: PropTypes.oneOf(['small']),
  rounded: PropTypes.bool,
  depress: PropTypes.bool,
  link: PropTypes.bool,
  onClick: PropTypes.func
};

export function withButtonisation(WrappedComponent) {
  return ({
    css,
    btnStyle,
    btnSize,
    link,
    rounded,
    depress,
    icon,
    ...passProps
  }: IButtonProps) => {
    const buttonClasses = getButtonClasses({
      css,
      btnStyle,
      btnSize,
      link,
      rounded,
      depress,
      icon
    });

    return <WrappedComponent {...passProps} icon={icon} css={buttonClasses} />;
  };
}

export function withCustomButtonWrapper(
  WrappedComponent,
  { className: customClass, ...customProps }
) {
  return ({ className, ...props }: IButtonProps) => {
    return (
      <WrappedComponent
        {...props}
        className={classNames(customClass, className)}
        {...customProps}
      />
    );
  };
}

interface IButtonGroupProps {
  className?: string;
  css?: SerializedStyles;
  centered?: boolean;
  right?: boolean;
  children: React.ReactNode;
}

export function ButtonGroup(props: IButtonGroupProps) {
  return (
    <div
      css={[
        bgStyles.ButtonGroup,
        props.centered && bgStyles.ButtonGroupCentered,
        props.right && bgStyles.ButtonGroupRightAligned,
        props.css
      ]}
    >
      {props.children}
    </div>
  );
}
