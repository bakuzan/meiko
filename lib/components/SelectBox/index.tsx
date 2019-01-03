/* eslint jsx-a11y/no-onchange: "off" */
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ISelectBoxOption } from 'types';
import './SelectBox.scss';

interface ISelectBoxProps {
  name: string;
  value: string | number | string[];
  disabled: boolean;
  text: string;
  options: ISelectBoxOption[];
  onSelect(e: React.ChangeEvent<HTMLSelectElement>): void;
}

const SelectBox = ({
  name,
  value,
  disabled,
  onSelect,
  text,
  options
}: ISelectBoxProps) => (
  <div className={classNames('has-float-label', 'select-container')}>
    <select
      className={classNames('select-box')}
      name={name}
      value={value}
      onChange={onSelect}
      disabled={disabled}
    >
      {options.map((item) => (
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
