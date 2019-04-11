import { sheet } from './nano';
import { zIndexes } from './variables';

const tickboxStyles = {
  tickbox: {
    display: 'flex',
    minHeight: '35px',
    maxHeight: '45px',
    flex: 1
  },
  tickbox__label: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '2px',
    cursor: 'pointer'
  },
  tickbox__label_disabled: {
    cursor: 'default'
  },
  tickbox__input: {
    appearance: 'none',
    transition: 'all 0.3s',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    margin: '0 5px',
    '&::before, &:checked::before': {
      color: '#000',
      transition: 'all 0.3s',
      cursor: 'pointer',
      zIndex: zIndexes.get('wafer')
    },
    '&::before': {
      content: "'\u2610'",
      fontSize: '2em'
    },
    '&:disabled::before': {
      content: "'\u274c'",
      color: '#666',
      cursor: 'default'
    },
    '&:checked::before': {
      content: "'\u2611'",
      color: '#0f0'
    }
  }
};

export default sheet(tickboxStyles);
