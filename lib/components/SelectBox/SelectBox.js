/* eslint jsx-a11y/no-onchange: "off" */
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './SelectBox.scss';

const cx = classNames.bind(styles);

const SelectBox = ({ name, value, disabled, onSelect, text, options }) => (
  <div className={cx('has-float-label', 'select-container')}>
    <select
      className={cx('select-box')}
      name={name}
      value={value}
      onChange={onSelect}
      disabled={disabled}
    >
      {options.map(item => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
    <label htmlFor={name}>{text}</label>
  </div>
);

SelectBox.defaultProps = {
  disabled: false
};

SelectBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SelectBox;
