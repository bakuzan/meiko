/* eslint jsx-a11y/no-onchange: "off" */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles/SelectBox';
import shared from './styles/shared';

const SelectBox = ({
  containerClassName,
  className,
  text,
  options,
  ...props
}) => (
  <div
    className={classNames(
      'has-float-label',
      'select-container',
      shared.controlContainer,
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

SelectBox.displayName = 'SelectBox';
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
