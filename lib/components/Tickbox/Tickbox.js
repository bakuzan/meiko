import classNames from 'classnames/bind'
import PropTypes from 'prop-types';
import React from 'react';
import styles from './Tickbox.scss';

const cx = classNames.bind(styles);

const Tickbox = ({ name, checked, disabled, onChange, text }) => (
  <div className="input-container">
    <label className={cx("tickbox")} htmlFor={name}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {text}
    </label>
  </div>
);

Tickbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string
};

export default Tickbox;
