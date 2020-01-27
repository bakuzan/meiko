import { sheet } from './nano';

import { media } from './shared';

const styles = {
  tooltip: {
    position: 'relative'
  },
  tooltip__highlight: {
    boxShadow: '1px 1px 5px 1px var(--tooltip-background)'
  },
  tooltipContent: {
    visibility: 'hidden',
    opacity: 0,
    position: 'absolute',
    bottom: '5px',
    left: '5px',
    width: 'auto',
    height: 'auto',
    backgroundColor: 'var(--tooltip-background)',
    color: 'var(--tooltip-colour)',
    padding: '5px',
    border: '2px solid var(--tooltip-background)',
    borderRadius: '4px',
    transition: 'all ease-in-out 0.5s',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    zIndex: 10,
    fontSize: '1rem'
  },
  tooltipContent__inPortal: {
    transition: `all 0.6s ease-in-out 0.25s`
  },
  tooltipContent__wrap: { whiteSpace: 'pre' },
  tooltipContent__center: { left: '50%', transform: 'translateX(-50%)' },
  tooltipContent__fixed: {
    position: 'fixed',
    ...media(['xxs'], {
      left: '5px !important'
    })
  },
  tooltipContent__hovered: {
    visibility: 'visible',
    opacity: 1
  }
};

export default sheet(styles);
