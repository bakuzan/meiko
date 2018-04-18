import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Button.scss';

const cx = classNames.bind(styles);

const Button = ({ className, btnStyle, btnSize, link, children, ...props }) => {
  const hasBtnStyle = !!btnStyle;
  const hasBtnSize = !!btnSize;
  const hasLink = !!link;
  const hasIcon = !!props.icon;
  const buttonClasses = cx(className, {
    button: !hasLink && !hasIcon,
    'button-link': hasLink,
    'button-icon': hasIcon,
    [btnStyle]: hasBtnStyle,
    [btnSize]: hasBtnSize
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
  onClick: PropTypes.func
};

export default Button;
