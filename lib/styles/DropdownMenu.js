import { sheet } from './nano';
import { standardShadow } from './shared';
import { dropdownMenuBackground, zIndexes } from './variables';

export default sheet({
  menu: {
    position: 'fixed',
    width: '200px',
    minHeight: '100px',
    backgroundColor: dropdownMenuBackground,
    borderRadius: '4px',
    top: 0,
    right: 0,
    padding: '2px',
    margin: 0,
    listStyleType: 'none',
    transform: 'translateY(50%)',
    transition: 'visibility 0.5s',
    transitionDelay: '1s !important',
    zIndex: zIndexes.get('popover'),
    ...standardShadow
  },
  menu_center: {
    left: '50%',
    transform: 'translateY(50%) translateX(-50%)',
    '& .dropdown-menu__arrow': {
      left: '50%',
      transform: 'translateX(-50%)'
    }
  },
  arrow: {
    position: 'absolute',
    top: '-20px',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderBottom: `20px solid ${dropdownMenuBackground}`,
    width: 0,
    height: 0,
    filter: 'drop-shadow(0 -2px 2px #aaa)'
  },
  arrow_left: {
    left: 0
  },
  arrow_right: {
    right: 0
  }
  //   container: {
  //     > input {
  //         display: none;
  //       }
  //       > label {
  //         cursor: pointer;
  //         &:before {
  //           content: attr(icon);
  //           font-size: 1.5rem;
  //         }
  //       }
  //   }
});
