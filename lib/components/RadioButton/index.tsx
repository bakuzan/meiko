import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './RadioButton.scss';

export interface IRadioButtonProps {
  id?: string;
  name: string;
  label: string;
  value: string | number;
  checked: boolean;
  onSelect(e: React.ChangeEvent<HTMLInputElement>): void;
}

const RadioButton = ({ id, label, onSelect, ...props }: IRadioButtonProps) => (
  <label
    className={classNames('radio')}
    htmlFor={id}
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
