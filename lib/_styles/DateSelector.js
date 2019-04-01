import { sheet } from './nano';
import { dateSelectorErrorMessageColour, zIndexes } from './variables';

export default sheet({
  dateSelector: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'wrap',
    '& .date-selector__button': {
      width: '24px',
      margin: 'auto 5px',
      // marginTop: '10px',
      // marginBottom: '10px',
      marginLeft: '-20px',
      zIndex: zIndexes.get('wafer')
    },
    '& .date-selector__clear': {
      marginLeft: '-40px',
      '& + .date-selector__button': {
        marginLeft: 0
      }
    }
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
    display: 'flex',
    flex: 1,
    paddingLeft: '10px',
    color: dateSelectorErrorMessageColour,
    fontSize: '0.8em',
    whiteSpace: 'nowrap'
  }
});
