import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import styles from './_styles/Tickbox';

export interface ITickboxProps extends React.HTMLProps<HTMLInputElement> {
  containerClassName?: string;
  text?: string;
}

const Tickbox = ({
  containerClassName,
  className,
  text,
  ...props
}: ITickboxProps) => (
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

Tickbox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default Tickbox;
