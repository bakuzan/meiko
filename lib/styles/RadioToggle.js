/*eslint no-dupe-keys: "off"*/
import { sheet } from './nano';
import { forScreenReader } from './shared';

const radioTogglePadding = 5;

export default sheet({
  radioToggle: {
    position: 'relative',
    display: 'inline-flex',
    padding: `${radioTogglePadding}px`,
    userSelect: 'none',
    cursor: 'pointer',
    height: '1.25em',
    '&:active .radio-toggle__control': {
      boxShadow: '0px 0px 5px 5px var(--radio-toggle--box-shadow-colour)'
    }
  },
  radioToggle_checked: {
    '& .radio-toggle__control': {
      left: '1.7em'
    }
  },
  radioToggle_focused: {
    '& .radio-toggle__control': {
      boxShadow: '0px 0px 2px 3px var(--radio-toggle--box-shadow-colour)'
    }
  },
  radioToggle__options: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '2.75em',
    transition: 'all 0.25s ease'
  },
  radioToggle__option: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1em',
    fontSize: '1em'
  },
  radioToggle__control: {
    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    position: 'absolute',
    top: `${1 + radioTogglePadding}px`,
    left: `${radioTogglePadding}px`,

    backgroundColor: '#fafafa',
    width: '1.2em',
    height: '1.2em',
    border: '1px solid #4d4d4d',
    borderRadius: '50%',
    transition: 'all 0.25s ease'
  },
  radioToggle__forScreenReader: {
    ...forScreenReader
  }
});
