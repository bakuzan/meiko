import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import styles, { isSmall } from './Button';

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  btnStyle?: string;
  btnSize?: string;
  link?: boolean;
  icon?: string;
}

function getButtonClasses({ className, btnStyle, btnSize, link, icon }) {
  const hasBtnStyle = !!btnStyle;
  const hasBtnSize = !!btnSize;
  const hasLink = !!link;
  const hasIcon = !!icon;
  const isStandard = !hasLink && !hasIcon;

  if (hasBtnSize) {
    btnSize === 'small' && isSmall();
  }

  return classNames(
    'button',
    'ripple',
    {
      'button--standard': isStandard,
      'button--link': hasLink,
      'button--icon': hasIcon,
      [`button--${btnStyle}`]: hasBtnStyle,
      [`button--${btnSize}`]: hasBtnSize
    },
    className,
    styles.button,
    isStandard && styles.button_standard,
    hasLink && styles.button_link,
    hasIcon && styles.button_icon
  );
}

export function withButtonisation(WrappedComponent) {
  return ({ className, btnStyle, btnSize, link, ...props }) => {
    const buttonClasses = getButtonClasses({
      className,
      btnStyle,
      btnSize,
      link,
      icon: props.icon
    });
    return <WrappedComponent {...props} className={buttonClasses} />;
  };
}

export function Button({
  className,
  btnStyle,
  btnSize,
  link,
  children,
  ...props
}: IButtonProps) {
  const buttonClasses = getButtonClasses({
    className,
    btnStyle,
    btnSize,
    link,
    icon: props.icon
  });
  return (
    <button {...props} className={buttonClasses}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  btnStyle: PropTypes.oneOf(['primary', 'accent']),
  btnSize: PropTypes.oneOf(['small']),
  rounded: PropTypes.bool,
  link: PropTypes.bool,
  icon: PropTypes.string
};
