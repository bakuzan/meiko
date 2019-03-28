import { sheet } from './nano';

const defaultColour = '#8385aa';

const bouncerStyles = {
  bouncer: {
    display: 'flex',
    justifyContent: 'center'
  },
  orb: {
    width: '1rem',
    height: '1rem',
    margin: '3rem 0.2rem',
    background: defaultColour,
    borderRadius: '50%',
    animation: 'bouncing 0.6s infinite alternate',
    '@keyframes bouncing': {
      from: {
        opacity: 1,
        transform: 'translateY(0)'
      },
      to: {
        opacity: 0.1,
        transform: 'translateY(-1rem)'
      }
    },
    '&:nth-child(2)': {
      animationDelay: '0.2s'
    },
    '&:nth-child(3)': {
      animationDelay: '0.4s'
    }
  }
};

export default sheet(bouncerStyles);
