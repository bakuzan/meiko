import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './RadioButton.scss';

const RadioButton = ({ label, onSelect, ...props }) => (
  <label
    className={classNames('radio')}
    htmlFor={props.id}
    aria-checked={props.checked}
  >
    <input type="radio" onChange={onSelect} {...props} />
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
