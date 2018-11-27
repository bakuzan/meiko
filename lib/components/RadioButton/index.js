import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './RadioButton.scss';

const cx = classNames.bind(styles);

const RadioButton = ({ id, name, label, value, checked, onSelect }) => (
  <label className={cx('radio')} htmlFor={id} aria-checked={checked}>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={(e) => onSelect(e)}
    />
    <span>{label}</span>
  </label>
);

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number
  ]).isRequired,
  checked: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RadioButton;
