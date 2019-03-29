import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './_styles/RadioButton';

const RadioButton = ({ containerClassName, className, label, ...props }) => (
  <label
    className={classNames('radio', styles.radio, containerClassName)}
    htmlFor={props.id}
    aria-checked={props.checked}
  >
    <input
      type="radio"
      className={classNames('radio__input', styles.radio__input, className)}
      {...props}
    />
    <span className="radio__label">{label}</span>
  </label>
);

RadioButton.displayName = 'RadioButton';
RadioButton.propTypes = {
  containerClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]).isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RadioButton;
