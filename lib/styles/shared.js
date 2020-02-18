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

export const normaliseButton = {
  background: 'none',
  border: 'none',
  boxShadow: 'none'
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

const screenXS = 480;
const screenSM = 768;
const screenMD = 992;
const screenLG = 1200;

// Prevent overlapping
const screenXXSMax = screenXS - 1;
const screenXSMax = screenSM - 1;
const screenSMMax = screenMD - 1;
const screenMDMax = screenLG - 1;

const mediaSizes = new Map([
  ['xss', `@media (max-width: ${screenXXSMax}px)`],
  [
    'xs',
    ` @media (min-width: ${screenXS}px) and (max-width: ${screenXSMax}px)`
  ],
  ['sm', `@media (min-width: ${screenSM}px) and (max-width: ${screenSMMax}px)`],
  ['md', `@media (min-width: ${screenMD}px) and (max-width: ${screenMDMax}px)`],
  ['lg', `@media (min-width: ${screenLG}px)`]
]);

export function media(sizes, styles) {
  return sizes.reduce((p, size) => {
    const key = mediaSizes.get(size);
    return { ...p, [key]: styles };
  }, {});
}
