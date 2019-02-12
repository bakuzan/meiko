import { zIndexes } from '../../styles/variables';
import { relative, absolute, preLine, center, bold } from '../../styles/types';

export default {
  Autocomplete: {
    position: relative,
    display: 'flex',
    flex: '1 1 100%'
  },
  AutocompleteMenu: {
    position: absolute,
    right: 0,
    bottom: 0,
    width: '100%',
    maxHeight: '250px',
    padding: '5px',
    margin: 0,
    overflow: 'auto',
    listStyleType: 'none',
    zIndex: zIndexes.get('menu'),
    boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.5)',
    transform: 'translateY(100%)'
  },
  AutocompleteSuggestionButton: {
    width: '100%'
  },
  AutocompleteSuggestionText: {
    whiteSpace: preLine
  },
  Highlight: {
    fontWeight: bold
  },
  NoSuggestionsItem: {
    fontSize: '13.33px',
    textAlign: center
  }
};
