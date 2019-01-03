import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './RadioButton.scss';

interface IRadioButtonProps {
  id?: string;
  name: string;
  label: string;
  value: string | number;
  checked: boolean;
  onSelect(e: React.ChangeEvent<HTMLInputElement>): void;
}

const RadioButton = ({
  id,
  name,
  label,
  value,
  checked,
  onSelect
}: IRadioButtonProps) => (
  <label className={classNames('radio')} htmlFor={id} aria-checked={checked}>
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onSelect}
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
