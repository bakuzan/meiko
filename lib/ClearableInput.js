import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import { Button } from './Button';
import Icons from './constants/icons';
import styles from './styles/ClearableInput';
import shared from './styles/shared';

export const Input = React.forwardRef(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="text"
      placeholder=" "
      autoComplete="off"
      className={classNames('input', className)}
      {...props}
    />
  );
});

const fakeEvent = ({ type, name }) => ({
  target: {
    type: type || 'text',
    name,
    value: ''
  }
});

function ClearableInput({
  containerClassName,
  className,
  label,
  error,
  maxNumberText,
  ...props
}) {
  const ref = useRef();
  const isTextInput = props.type === 'text' || !props.type;
  const isNumberInput = props.type === 'number';
  const hasMaxOrMinNumber = !isNaN(props.max) || !isNaN(props.min);
  const notClearable = !isTextInput;

  function clearAndFocusInput() {
    props.onChange(fakeEvent(props));
    ref.current.focus();
  }

  return (
    <div
      className={classNames(
        'clearable-input has-float-label',
        containerClassName,
        styles.clearableInput,
        shared.controlContainer
      )}
    >
      <div
        className={classNames(
          'clearable-input__inner',
          styles.clearableInput__inner
        )}
      >
        <Input
          {...props}
          ref={ref}
          className={classNames(
            'clearable-input__input',
            styles.clearableInput__input,
            notClearable && styles.clearableInput__input_notClearable,
            className
          )}
        />
        <label htmlFor={props.id}>{label}</label>
        {!!props.value && isTextInput && (
          <Button
            type="button"
            className={classNames(
              'clearable-input__clear',
              styles.clearableInput__clear
            )}
            btnSize="small"
            aria-label="Clear input"
            icon={Icons.cross}
            onClick={clearAndFocusInput}
          />
        )}
      </div>
      <div
        className={classNames(
          'clearable-input__under',
          styles.clearableInput__inner,
          styles.clearableInput__under
        )}
      >
        {(!!props.maxLength || hasMaxOrMinNumber) && (
          <div
            className={classNames(
              'clearable-input__count',
              styles.clearableInput__count
            )}
          >
            {props.maxLength &&
              isTextInput &&
              `${props.value.length}/${props.maxLength}`}
            {hasMaxOrMinNumber && isNumberInput && maxNumberText(props)}
          </div>
        )}

        {error && (
          <div
            className={classNames(
              'clearable-input__error',
              styles.clearableInput__error
            )}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

ClearableInput.displayName = 'ClearableInput';
ClearableInput.defaultProps = {
  maxNumberText: (props) =>
    props.max ? `out of ${props.max || '?'}` : `more than ${props.min}`
};

ClearableInput.propTypes = {
  containerClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  maxNumberText: PropTypes.func
};

export default ClearableInput;
