import { sheet } from './nano';
import { dateSelectorErrorMessageColour, zIndexes } from './variables';

export default sheet({
  dateSelector: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'wrap',
    '& .date-selector__button': {
      minWidth: '24px',
      padding: '3px',
      margin: 'auto 0',
      marginLeft: '-24px',
      zIndex: zIndexes.get('wafer')
    },
    '& .date-selector__clear': {
      marginLeft: '-48px',
      '& + .date-selector__button': {
        marginLeft: 0
      }
    }
  },
  dateSelector__inputContainer: {
    minWidth: '145px'
  },
  dateSelector__input: {
    display: 'flex',
    flex: '1 1 90%',
    '&::-webkit-calendar-picker-indicator, &::-webkit-inner-spin-button, &::-webkit-clear-button': {
      appearance: 'none',
      display: 'none'
    }
  },
  error: {
    position: 'absolute',
    bottom: '-5px',
    display: 'flex',
    paddingLeft: '10px',
    color: dateSelectorErrorMessageColour,
    fontSize: '0.8em',
    whiteSpace: 'nowrap'
  }
});
