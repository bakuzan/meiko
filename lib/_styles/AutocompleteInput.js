import { sheet } from './nano';
import { zIndexes } from './variables';

export default sheet({
  autocomplete: {
    position: 'relative',
    display: 'flex',
    flex: '1 1 100%'
  },
  autocomplete__menu: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '5px',
    margin: '5px 0',
    listStyleType: 'none',
    '& li': {
      flexBasis: '100%'
    },
    maxHeight: '250px',
    overflow: 'auto',
    zIndex: zIndexes.get('menu'),
    boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(100%)'
  },
  suggestion: {
    border: '1px solid transparent',
    button: {
      width: '100%'
    }
  },
  suggestion__text: {
    whiteSpace: 'pre-line'
  },
  suggestionHighlight: {
    fontWeight: 'bold'
  },
  suggestion_noItems: {
    fontSize: '13.33px',
    textAlign: 'center'
  }
});
