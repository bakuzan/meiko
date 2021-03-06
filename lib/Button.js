import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles/Button';

function getButtonClasses({ className, btnStyle, btnSize, link, icon }) {
  const hasBtnStyle = !!btnStyle;
  const hasBtnSize = !!btnSize;
  const hasLink = !!link;
  const hasIcon = !!icon;
  const isStandard = !hasLink && !hasIcon;
  const isSmall = btnSize === 'small';

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
    styles.button,
    isStandard && styles.button_standard,
    hasLink && styles.button_link,
    hasIcon && styles.button_icon,
    isSmall && styles.button_small,
    className
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

export const Button = React.forwardRef(function Button(
  { className, btnStyle, btnSize, link, children, ...props },
  ref
) {
  const buttonClasses = getButtonClasses({
    className,
    btnStyle,
    btnSize,
    link,
    icon: props.icon
  });

  return (
    <button {...props} ref={ref} className={buttonClasses}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
Button.defaultProps = {
  type: 'button'
};

Button.propTypes = {
  btnStyle: PropTypes.oneOf(['primary', 'accent']),
  btnSize: PropTypes.oneOf(['small']),
  link: PropTypes.bool,
  icon: PropTypes.string
};
