import { sheet } from './nano';
import { uiMessaging } from './variables';

const toasterStyles = {
  toaster: {
    position: 'fixed',
    bottom: '12px',
    right: '12px',
    zIndex: 9001,
    pointerEvents: 'none'
  },
  toast: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto',
    overflow: 'hidden',
    margin: '0 0 6px',
    padding: '10px',
    paddingLeft: '40px',
    width: '300px',
    borderRadius: '3px',
    boxShadow: '0 0 12px #999',
    color: '#fff',
    opacity: 0,
    cursor: 'pointer',
    animation: 'cool-down 3s 1',
    '@keyframes cool-down': {
      '0%': {
        opacity: 0.8
      },
      '50%': {
        opacity: 0.8
      },
      '75%': {
        opacity: 0.4
      },
      '100%': {
        opacity: 0
      }
    },
    '&::before': {
      position: 'absolute',
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%)',
      fontSize: '1.6rem'
    }
  },
  toast__title: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  ...[...uiMessaging.entries()].reduce((p, [k, data]) => {
    return {
      ...p,
      [`toast--${k}`]: {
        backgroundColor: data.background,
        color: data.colour,
        '&::before': {
          content: `"${data.icon}"`
        }
      }
    };
  }, {})
};

export default sheet(toasterStyles);
