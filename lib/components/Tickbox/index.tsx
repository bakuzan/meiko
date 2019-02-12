import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import styled from '../../styles';
import { StyledControlContainer } from '../../styles/generic';
import { zIndexes } from '../../styles/variables';

export interface ITickboxProps {
  className?: string;
  name: string;
  checked: boolean;
  disabled?: boolean;
  text?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const StyledCheckbox = styled.label<{ disabled: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2px;
  cursor: pointer;

  input[type='checkbox'] {
    appearance: none;
    transition: all 0.3s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }

  ${(props) => props.disabled && 'cursor: default;'}

  input:before,
  input:checked:before {
    color: #000;
    transition: all 0.3s;
    cursor: pointer;
    z-index: ${zIndexes.get('wafer')};
  }

  input:before {
    content: '\2610';
    font-size: 2em;
  }

  input:disabled:before {
    content: '\274c';
    color: #666;
    cursor: default;
  }

  input:checked:before {
    content: '\2611';
    color: #0f0;
  }
`;

const Tickbox = ({
  className,
  name,
  checked,
  disabled,
  onChange,
  text
}: ITickboxProps) => (
  <StyledControlContainer className={classNames('input-container', className)}>
    <StyledCheckbox
      className={classNames('tickbox', { 'tickbox--disabled': disabled })}
      htmlFor={name}
      disabled={disabled}
    >
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      {text || ''}
    </StyledCheckbox>
  </StyledControlContainer>
);

Tickbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  text: PropTypes.string
};

export default Tickbox;
