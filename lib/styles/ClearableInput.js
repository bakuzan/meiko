import { sheet } from './nano';

import { clearableInputUnderPadding } from './variables';

const clearableInputStyles = {
  clearableInput: {
    display: 'flex',
    flexDirection: 'column'
  },
  clearableInput__inner: {
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  clearableInput__under: {
    padding: `${clearableInputUnderPadding}px 0`
  },
  clearableInput__input: {
    display: 'flex',
    // flex: "1 1 100%",
    width: '100%',
    maxWidth: '100%'
  },
  clearableInput__input_notClearable: {
    paddingRight: '1.5em'
  },
  clearableInput__clear: {
    position: 'absolute !important',
    top: '50%',
    right: '5px',
    transform: 'translateY(-50%)',
    height: '1.5em',
    width: '1.5em',
    padding: '0',
    margin: 'auto 0'
  },
  clearableInput__count: {
    position: 'absolute',
    right: '5px',
    bottom: '0',
    top: 'auto',
    left: 'auto',
    fontSize: '0.5em'
  },
  clearableInput__error: {
    color: '#f00',
    padding: '0 5px',
    fontSize: '0.65em'
  }
};

export default sheet(clearableInputStyles);
