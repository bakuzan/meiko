import { css } from './index';

export default css`
  display: flex;
  position: relative;

  label {
    position: absolute;
    left: 5px;
    top: 1px;
    cursor: text;
    font-size: 0.75em;
    opacity: 1;
    transition: all 0.2s;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  input,
  select {
    font-size: inherit;
    padding: 0 0.5em;
    padding-top: 1em;
    margin-bottom: 2px;
    border: 0;
    border-radius: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
  input::-webkit-input-placeholder,
  select::-webkit-input-placeholder {
    opacity: 1;
    transition: all 0.2s;
  }

  input:placeholder-shown:not(:focus)::-webkit-input-placeholder,
  select:placeholder-shown:not(:focus)::-webkit-input-placeholder {
    opacity: 0;
  }

  input:placeholder-shown:not(:focus) + *:not(.input-has-content),
  select:placeholder-shown:not(:focus) + *:not(.input-has-content) {
    font-size: 1.3em;
    opacity: 0.7;
    pointer-events: none;
    top: 0.65em;
    left: 0.5em;
  }
  input:focus,
  select:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.5);
  }
  select {
    margin-bottom: 0;
  }
  &.input-list-container input {
    padding-bottom: 0.3em;
  }
  &.input-list-container
    input:placeholder-shown:not(:focus)
    + *:not(.input-has-content) {
    font-size: 1.3em;
    opacity: 0.5;
    pointer-events: none;
    top: 1em;
  }
  &.select-container::after {
    content: '⌵';
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    font-weight: bold;
    pointer-events: none;
  }
`;
