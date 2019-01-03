import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import './Button.scss';

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  btnStyle?: string;
  btnSize?: string;
  link?: boolean;
  rounded?: boolean;
  depress?: boolean;
  icon?: string;
}

function getButtonClasses({
  className,
  btnStyle,
  btnSize,
  link,
  rounded,
  depress,
  icon
}) {
  const hasBtnStyle = !!btnStyle;
  const hasBtnSize = !!btnSize;
  const hasLink = !!link;
  const hasIcon = !!icon;
  return classNames(className, {
    button: !hasLink && !hasIcon,
    'button-link': hasLink,
    'button-icon': hasIcon,
    [btnStyle]: hasBtnStyle,
    [btnSize]: hasBtnSize,
    rounded,
    depress
  });
}

export const Button = ({
  className,
  btnStyle,
  btnSize,
  link,
  rounded,
  depress,
  children,
  ...props
}: IButtonProps) => {
  const buttonClasses = getButtonClasses({
    className,
    btnStyle,
    btnSize,
    link,
    rounded,
    depress,
    icon: props.icon
  });

  return (
    <button className={buttonClasses} {...props}>
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
    className,
    btnStyle,
    btnSize,
    link,
    rounded,
    depress,
    icon,
    ...passProps
  }: IButtonProps) => {
    const buttonClasses = getButtonClasses({
      className,
      btnStyle,
      btnSize,
      link,
      rounded,
      depress,
      icon
    });

    return (
      <WrappedComponent {...passProps} icon={icon} className={buttonClasses} />
    );
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
