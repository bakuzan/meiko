import { sheet } from './nano';
import {
  anchorColour,
  anchorColourHover,
  disabledBackground,
  disabledColour
} from './variables';
import { centerContents } from './shared';

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
      ...centerContents,
      content: 'attr(icon)',
      fontSize: '1.5rem'
    },
    '&:not(:disabled)': {
      cursor: 'pointer'
    }
  },
  button_small: {
    '&::before': {
      fontSize: '0.8rem'
    }
  }
};

export default sheet(buttonStyles);
