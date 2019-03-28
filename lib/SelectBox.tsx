/* eslint jsx-a11y/no-onchange: "off" */
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ISelectBoxOption } from 'types';

import styles from './_styles/SelectBox';

export interface ISelectBoxProps extends React.HTMLProps<HTMLSelectElement> {
  containerClassName?: string;
  text: string;
  options: ISelectBoxOption[];
}

const SelectBox = ({
  containerClassName,
  className,
  text,
  options,
  ...props
}: ISelectBoxProps) => (
  <div
    className={classNames(
      'has-float-label',
      'select-container',
      containerClassName
    )}
  >
    <select
      className={classNames('select-box', styles.select, className)}
      {...props}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.text}
        </option>
      ))}
    </select>
    <label htmlFor={props.id}>{text}</label>
  </div>
);

SelectBox.defaultProps = {
  disabled: false
};

SelectBox.propTypes = {
  id: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectBox;
