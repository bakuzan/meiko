import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Button } from './Button';
import Icons from './_constants/icons';
import styles from './_styles/ClearableInput';

export interface IClearableInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  containerClassName?: string;
  label: string;
  error?: string;
  maxNumberText: (props: React.HTMLProps<HTMLInputElement>) => string;
}

export const Input = React.forwardRef(function Input(
  {
    className,
    ...props
  }: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  ref: React.Ref<HTMLInputElement>
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

const fakeEvent = ({ type, name }: React.HTMLProps<HTMLInputElement>) =>
  ({
    target: {
      type: type || 'text',
      name,
      value: ''
    }
  } as React.ChangeEvent<HTMLInputElement>);

function ClearableInput({
  containerClassName,
  label,
  error,
  maxNumberText,
  ...props
}: IClearableInputProps) {
  const ref = React.useRef<HTMLInputElement>();
  const isTextInput = props.type === 'text' || !props.type;
  const isNumberInput = props.type === 'number';
  const hasMaxNumber = !isNaN(props.max as any);
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
        styles.clearableInput
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
            notClearable && styles.clearableInput__input_notClearable
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
          styles.clearableInput__inner
        )}
      >
        {(!!props.maxLength || hasMaxNumber) && (
          <div
            className={classNames(
              'clearable-input__count',
              styles.clearableInput__count
            )}
          >
            {props.maxLength &&
              isTextInput &&
              `${(props.value as string).length}/${props.maxLength}`}
            {hasMaxNumber && isNumberInput && maxNumberText(props)}
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

ClearableInput.defaultProps = {
  maxNumberText: (props) => `out of ${props.max || '?'}`
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
