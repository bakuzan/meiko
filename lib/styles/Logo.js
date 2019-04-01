import { sheet } from './nano';

const logoStyles = {
  logo: {
    width: '50px',
    height: '50px'
  },
  logo__svg: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    padding: '0.25em 0.25em 0',
    boxSizing: 'border-box',
    '&:not(:hover)': {
      '.logo__word': {
        opacity: 0
      },
      '.logo__letter--hideshow': {
        animation: 'hideshow 1.6s linear 1',
        '@keyframes hideshow': {
          '0%': {
            opacity: 0
          },
          '50%': {
            opacity: 1
          },
          '100%': {
            opacity: 0
          }
        }
      }
    },
    '&:hover': {
      '> .logo__word': {
        opacity: 1
      },
      '> .logo__letter': {
        opacity: '0 !important'
      }
    }
  },
  logo__word: {
    textAnchor: 'end',
    fontSize: '0.9em',
    transition: 'all 0.5s ease-in-out',
    opacity: 0
  },
  logo__word_diagonal: {
    transform: 'translateX(0.6em) translateY(0.125em) rotate(-45deg)'
  },
  logo__letter: {
    textAnchor: 'middle',
    fontSize: '3em',
    transition: 'all 0.5s ease-in-out',
    opacity: 0
  }
};

export default sheet(logoStyles);
