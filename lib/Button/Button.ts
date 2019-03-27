import { nano, sheet } from '../_utils/nano';
import {
  anchorColour,
  anchorColourHover,
  disabledBackground,
  disabledColour
} from '../_utils/styleVariables';

const buttonStyles = {
  button: {
    appearance: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'inherit',
    color: 'inherit',
    padding: '5px',
    border: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    '&:disabled': {
      backgroundColor: `${disabledBackground} !important`,
      color: `${disabledColour} !important`,
      cursor: 'default'
    }
  },
  button_standard: {
    minWidth: '100px',
    minHeight: '25px',
    textDecoration: 'none'
  },
  button_link: {
    textDecoration: 'underline',
    color: anchorColour,

    '&:focus': {
      color: anchorColour
    },
    '&:active': {
      color: anchorColour
    },
    '&:hover': {
      color: anchorColourHover
    }
  },
  button_icon: {
    flex: '0 1 0%',
    padding: '3px 6px',
    margin: '2px 5px',
    textDecoration: 'none',

    '&::before': {
      content: 'attr(icon)',
      fontSize: '1.5rem'
    },
    '&:not(:disabled)': {
      cursor: 'pointer'
    }
  }
};

export const isSmall = () =>
  nano.put('.button--small', {
    '&:before': {
      fontSize: '0.8rem'
    }
  });

export default sheet(buttonStyles);
