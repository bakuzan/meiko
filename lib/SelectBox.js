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
  children = null,
  disabled = false,
  ...props
}) => {
  const hasChildren = !!children;
  const hasOptions = !!options;
  const isFn = typeof children === 'function';

  return (
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
        disabled={disabled}
        {...props}
      >
        {hasChildren && !isFn && children}
        {hasChildren && isFn && hasOptions && options.map(children)}
        {!hasChildren &&
          hasOptions &&
          options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
      </select>
      <label htmlFor={props.id}>{text}</label>
    </div>
  );
};

SelectBox.displayName = 'SelectBox';

SelectBox.propTypes = {
  id: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  text: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default SelectBox;
