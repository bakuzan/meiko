import { sheet } from './nano';

export default sheet({
  scrollTop: {
    background: 'none',
    border: 'none',
    position: 'fixed !important',
    bottom: '20px',
    right: '20px',
    width: '3rem',
    height: '3rem',
    padding: 0,
    boxShadow: '1px 1px 5px 0px',
    cursor: 'pointer',
    backgroundColor: 'var(--scroll-top-button--background, #fff)',
    color: 'var(--scroll-top-button--colour, #000)',
    '&::before': {
      content: "'\u25B2\uFE0F'",
      fontSize: '2rem',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    '&:hover': {
      backgroundColor: 'var(--scroll-top-button--background-hover, #efefef)'
    }
  }
});
