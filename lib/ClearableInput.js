import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import composeRefs from '@seznam/compose-react-refs';

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

const ClearableInput = React.forwardRef(function ClearableInput(
  {
    containerClassName,
    className,
    label,
    maxNumberText,
    clearButtonProps,
    ...props
  },
  extRef
) {
  const ref = useRef();
  const isTextInput = props.type === 'text' || !props.type;
  const isNumberInput = props.type === 'number';
  const isClearable = isTextInput;

  const hasMaxLength = !!props.maxLength;
  const hasMaxOrMinNumber = !isNaN(props.max) || !isNaN(props.min);
  const hasUnderContent = hasMaxLength || hasMaxOrMinNumber;

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
        shared.controlContainer,
        hasUnderContent && styles.bumpBottomPadding
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
          ref={composeRefs(ref, extRef)}
          className={classNames(
            'clearable-input__input',
            styles.clearableInput__input,
            isClearable && styles.clearableInput__input_clearable,
            className
          )}
        />
        <label htmlFor={props.id}>{label}</label>
        {!!props.value && isTextInput && (
          <Button
            type="button"
            btnSize="small"
            aria-label="Clear input"
            icon={Icons.cross}
            {...clearButtonProps}
            className={classNames(
              'clearable-input__clear',
              styles.clearableInput__clear,
              clearButtonProps.className
            )}
            onClick={clearAndFocusInput}
          />
        )}
      </div>

      {(hasMaxLength || hasMaxOrMinNumber) && (
        <div
          className={classNames(
            'clearable-input__count',
            styles.clearableInput__count
          )}
        >
          {hasMaxLength &&
            isTextInput &&
            `${props.value.length}/${props.maxLength}`}
          {hasMaxOrMinNumber && isNumberInput && maxNumberText(props)}
        </div>
      )}
    </div>
  );
});

ClearableInput.displayName = 'ClearableInput';
ClearableInput.defaultProps = {
  maxNumberText: (props) =>
    props.max ? `out of ${props.max || '?'}` : `more than ${props.min}`,
  clearButtonProps: {}
};

ClearableInput.propTypes = {
  containerClassName: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  maxNumberText: PropTypes.func,
  clearButtonProps: PropTypes.object
};

export default ClearableInput;
