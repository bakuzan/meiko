import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from '../Button';
import Icons from '../../constants/icons';
import { debounce } from '../../utils';

import styled from 'styles';
import { StyledControlContainer } from 'styles/generic';

interface IClearableInputProps extends React.HTMLProps<HTMLInputElement> {
  clearInputButtonClass?: string;
}

const StyledInput = styled.input`
  display: flex;
  flex: 1 0 100%;
  ${(props) => props.type !== 'text' && 'padding-right: 1.5em !important;'}
  ${(props) =>
    props.type === 'date' &&
    `
    &::-webkit-calendar-picker-indicator,
    &::-webkit-inner-spin-button,
    &::-webkit-clear-button {
      appearance: none;
      display: none;
    }
    `}
`;

const StyledButton = styled(Button)`
  position: relative;
  right: 30px;
`;

const StyledSpan = styled.span`
  position: absolute;
  right: 10px;
  bottom: -5px;
  top: auto;
  left: auto;
  font-size: 0.5rem;
`;

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

    this.inputField = React.createRef();
    this.clearAndFocusInput = this.clearAndFocusInput.bind(this);
  }

  clearAndFocusInput() {
    const target = { name: this.props.name, value: '' };
    const fakeEvent = { target } as any;
    this.props.onChange(fakeEvent);
    debounce(() => this.inputField.current.focus(), 100);
  }

  render() {
    const {
      className,
      clearInputButtonClass,
      type,
      label,
      name,
      value,
      maxLength,
      ...props
    } = this.props;
    const isTextInput = type === 'text';
    const isNumberInput = type === 'number';
    const hasMaxNumber = !isNaN(props.max as any);
    const notClearable = !isTextInput;

    return (
      <StyledControlContainer
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
        <StyledInput
          ref={this.inputField}
          placeholder=" "
          autoComplete="off"
          type={type}
          aria-label={label}
          name={name}
          value={value}
          maxLength={maxLength}
          {...props}
          as={'input'}
        />
        <label htmlFor={name}>{label}</label>
        {!!value && isTextInput && (
          <StyledButton
            className={classNames('clear-input', clearInputButtonClass)}
            btnSize="small"
            icon={Icons.cross}
            onClick={this.clearAndFocusInput}
          />
        )}
        {(!!maxLength || hasMaxNumber) && (
          <StyledSpan className={classNames('clearable-input-count')}>
            {maxLength &&
              isTextInput &&
              `${(value as string).length}/${maxLength}`}
            {hasMaxNumber && isNumberInput && `out of ${props.max || '?'}`}
          </StyledSpan>
        )}
      </StyledControlContainer>
    );
  }
}

export default ClearableInput;
