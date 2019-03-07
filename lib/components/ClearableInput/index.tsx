import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from '../Button';
import Icons from '../../constants/icons';
import { debounce } from '../../utils';
import './ClearableInput.scss';

interface IClearableInputProps extends React.HTMLProps<HTMLInputElement> {
  clearInputButtonClass?: string;
}

class ClearableInput extends React.Component<IClearableInputProps, any> {
  static defaultProps = {
    name: 'search',
    label: 'search',
    type: 'text'
  };

  static propTypes = {
    clearInputButtonClass: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func
  };

  private inputField = null;

  constructor(props: IClearableInputProps) {
    super(props);

    this.clearAndFocusInput = this.clearAndFocusInput.bind(this);
  }

  clearAndFocusInput() {
    this.props.onChange({
      target: { name: this.props.name, value: '' }
    } as any);
    debounce(() => this.inputField.focus(), 100);
  }

  render() {
    const {
      className,
      clearInputButtonClass,
      type,
      label,
      onChange,
      ...props
    } = this.props;
    const isTextInput = type === 'text';
    const isNumberInput = type === 'number';
    const hasMaxNumber = !isNaN(props.max as any);
    const notClearable = !isTextInput;

    return (
      <div
        className={classNames(
          className,
          'clearable-input',
          'has-float-label',
          'input-container',
          {
            'not-clearable': notClearable
          }
        )}
      >
        <input
          ref={(input) => (this.inputField = input)}
          placeholder=" "
          autoComplete="off"
          type={type}
          onChange={onChange}
          {...props}
        />
        <label htmlFor={props.id}>{label}</label>
        {!!props.value && isTextInput && (
          <Button
            className={classNames('clear-input', clearInputButtonClass)}
            btnSize="small"
            aria-label="Clear input"
            icon={Icons.cross}
            onClick={this.clearAndFocusInput}
          />
        )}
        {(!!props.maxLength || hasMaxNumber) && (
          <span className={classNames('clearable-input-count')}>
            {props.maxLength &&
              isTextInput &&
              `${(props.value as string).length}/${props.maxLength}`}
            {hasMaxNumber && isNumberInput && `out of ${props.max || '?'}`}
          </span>
        )}
      </div>
    );
  }
}

export default ClearableInput;
