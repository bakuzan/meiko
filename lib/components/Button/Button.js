import classNames from 'classnames/bind'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.scss'

const cx = classNames.bind(styles);

const Button = ({ className, children, ...props }) => {
  const hasBtnStyle = !!props.btnStyle;
  const hasLink = !!props.link;
  const hasIcon = !!props.icon;
  const buttonClasses = cx(className, {
    button: !hasLink && !hasIcon,
    'button-link': hasLink,
    'button-icon': hasIcon,
    'primary': hasBtnStyle && props.btnStyle === 'primary',
    'secondary': hasBtnStyle && props.btnStyle === 'secondary'
  });

  return (
    <button className={buttonClasses} {...props}>
    {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button'
}

Button.propTypes = {
  type: PropTypes.string,
  btnStyle: PropTypes.oneOf([
    'primary',
    'secondary'
  ]),
  onClick: PropTypes.func.isRequired
}

export default Button
