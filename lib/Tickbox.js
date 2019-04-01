import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles/Tickbox';

const Tickbox = ({ containerClassName, className, text, ...props }) => (
  <div className={classNames('tickbox', containerClassName)}>
    <label
      className={classNames(
        'tickbox__label',
        {
          'tickbox__label--disabled': props.disabled
        },
        styles.tickbox__label,
        props.disabled && styles.tickbox__label_disabled
      )}
      htmlFor={props.id}
    >
      <input
        type="checkbox"
        className={classNames(styles.tickbox__input, className)}
        {...props}
      />
      {text || ''}
    </label>
  </div>
);

Tickbox.displayName = 'Tickbox';
Tickbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default Tickbox;
