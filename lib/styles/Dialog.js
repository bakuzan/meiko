import { sheet } from './nano';
import { zIndexes } from './variables';

export default sheet({
  dialog: {
    minWidth: '300px',
    width: 'auto',
    maxWidth: '50vw',
    boxShadow: '2px 2px 10px #aaa',
    border: 'none',
    transform: 'translateY(-50%)',
    zIndex: zIndexes.get('popover')
  },
  dialog_backdrop: {
    '&::backdrop': {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#eee'
    }
  },
  dialog_noBackdrop: {
    '&::backdrop': {
      backgroundColor: 'transparent'
    }
  },
  title: {
    margin: 0,
    marginBottom: '15px'
  },
  cutomContent: {
    padding: '5px 0'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '5px',
    margin: '5px 0'
  }
});
