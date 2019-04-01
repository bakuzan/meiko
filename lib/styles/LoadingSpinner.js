import { sheet } from './nano';
import {
  spinnerColour1,
  spinnerColour2,
  spinnerColour3,
  spinnerColour4
} from './variables';

const width = '100px';
const widthSM = '30px';

const spinnerStyles = {
  loader: {
    position: 'relative',
    margin: '0px auto',
    width,
    '&::before': {
      content: '""',
      display: 'block',
      paddingTop: '100%'
    }
  },
  [`loader--control`]: {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    width: widthSM
  },
  [`loader--fullscreen`]: {
    position: 'fixed',
    top: '50px',
    left: 0,
    width: '100%',
    height: '100vh',
    background: '#fcfcfc',
    backgroundColor: 'rgba(240, 240, 240, 0.2)',
    zIndex: 999,
    '& .loader__circular': {
      top: '25vh',
      bottom: 'auto',
      left: '35vw',
      right: 'auto',
      width: '25vw',
      height: '25vh'
    }
  },
  circular: {
    height: '100%',
    width: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    animation: 'rotate 2s linear infinite',
    '@keyframes rotate': {
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    transformOrigin: 'center center',
    position: 'absolute',
    margin: 'auto'
  },
  path: {
    strokeDasharray: '1, 200',
    strokeDashoffset: 0,
    strokeLinecap: 'round',
    animation: 'dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite',
    '@keyframes dash': {
      '0%': {
        strokeDasharray: '1, 200',
        strokeDashoffset: 0
      },
      '50%': {
        strokeDasharray: '89, 200',
        strokeDashoffset: '-35px'
      },
      '100%': {
        strokeDasharray: '89, 200',
        strokeDashoffset: '-124px'
      }
    },
    '@keyframes color': {
      '100%, 0%': {
        stroke: spinnerColour1
      },
      '40%': {
        stroke: spinnerColour2
      },
      '66%': {
        stroke: spinnerColour3
      },
      '80%, 90%': {
        stroke: spinnerColour4
      }
    }
  }
};

export default sheet(spinnerStyles);
