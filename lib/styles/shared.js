import { sheet } from './nano';

// Shared partial styles
// Destructure into other styles

export const forScreenReader = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px'
};

export const standardShadow = {
  boxShadow: '2px 2px 10px #aaa'
};

export const centerContents = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

// Shared complete styles
// Import and use as classes
export default sheet({
  controlContainer: {
    flex: 1,
    padding: '5px',
    minHeight: '35px',
    maxHeight: '40px',
    boxSizing: 'content-box',

    '& select': {
      width: '100%'
    },

    "input[type='text'],  input[type='number'],  input[type='date'],  input[type='url']": {
      width: '100%',
      boxSizing: 'border-box'
    },

    '> button': {
      maxHeight: '32px',
      marginTop: 'auto',
      marginBottom: 'auto'
    }
  }
});
