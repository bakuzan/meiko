import { sheet } from './nano';

import { dropdownMenuBackground, zIndexes } from './variables';

const size = 24;
const arrowHeight = 20;
const marginPadding = 2 * 2 + 2 * 2;
const iconSize = {
  width: `${size}px`,
  height: `${size}px`
};

export default sheet({
  container: {
    position: 'relative'
  },
  menu: {
    position: 'absolute',
    width: '200px',
    minHeight: '100px',
    backgroundColor: dropdownMenuBackground,
    borderRadius: '4px',
    top: `${size + marginPadding + arrowHeight}px`,
    padding: '2px',
    margin: 0,
    listStyleType: 'none',
    transition: 'visibility 0.5s',
    transitionDelay: '1s !important',
    zIndex: zIndexes.get('popover'),
    boxShadow: '#aaa 1px 1px 5px'
  },
  menu_left: {
    left: `-${marginPadding / 2}px`
  },
  menu_center: {
    left: '50%',
    transform: 'translateX(-50%)',
    '& .dropdown-menu__arrow': {
      left: '50%',
      transform: 'translateX(-50%)'
    }
  },
  menu_right: {
    right: `-${marginPadding / 2}px`,
    '& .dropdown-menu__arrow': {
      right: 0
    }
  },
  toggler: {
    '&.button--icon': {
      ...iconSize,
      padding: '2px',
      margin: '2px',
      boxSizing: 'content-box',
      '&::before': {
        ...iconSize
      }
    }
  },
  arrow: {
    position: 'absolute',
    top: '-20px',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: `${arrowHeight}px solid ${dropdownMenuBackground}`,
    width: 0,
    height: 0,
    filter: 'drop-shadow(0 -1px 1px #aaa)'
  }
});
