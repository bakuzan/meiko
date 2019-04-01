import { sheet } from './nano';
import { headerHeight, zIndexes } from './variables';

const headerStyles = {
  applicationHeader: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: headerHeight,
    width: '100%',
    zIndex: zIndexes.get('header')
  },
  linkBlock: {
    position: 'relative',
    height: '100%',
    div: {
      height: '100%'
    },
    a: {
      height: '100%',
      padding: '8px',
      textDecoration: 'none',
      boxSizing: 'border-box'
    }
  }
};

export default sheet(headerStyles);
