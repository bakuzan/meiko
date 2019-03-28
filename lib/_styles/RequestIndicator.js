import { sheet } from './nano';

export default sheet({
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    width: '100%',
    height: '3px',
    background: 'transparent',
    overflow: 'hidden',
    zIndex: 10000
  },
  loader: {
    position: 'absolute',
    width: '200px',
    height: '100%',
    backgroundColor: '#000',
    zIndex: 1,
    animation: 'cycle 3s infinite',
    '@keyframes cycle': {
      '0%': {
        left: '-200px'
      },
      '100%': {
        left: 'calc(100% + 100px)'
      }
    }
  },
  loader_hidden: {
    backgroundColor: 'transparent !important'
  }
});
