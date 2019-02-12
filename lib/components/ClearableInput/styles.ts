import { relative, absolute } from '../../styles/types';

export default {
  ClearableInputInput: {
    display: 'flex',
    flex: '1 0 100%'
  },
  ClearableInputInputNotClearable: {
    paddingRight: '1.5em !important'
  },
  ClearableInputClearButton: {
    position: relative,
    right: '30px'
  },
  ClearableInputCount: {
    position: absolute,
    right: '10px',
    bottom: '-5px',
    top: 'auto',
    left: 'auto',
    fontSize: '0.5rem'
  },
  ClearableInputDateInput: {
    // '&::-webkit-calendar-picker-indicator, &::-webkit-inner-spin-button, &::-webkit-clear-button': {
    //   appearance: 'none',
    //   display: 'none'
    // }
  }
};
