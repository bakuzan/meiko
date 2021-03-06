import { sheet } from './nano';
import {
  calendarViewShiftButtonBackground,
  calendarSelectedDayBackground,
  calendarSelectedDayColour,
  calendarButtonBorderColour,
  zIndexes,
  darken,
  disabledBackground,
  disabledColour
} from './variables';
import { standardShadow } from './shared';

const darkenAmount = '5%';
const buttonPadding = '10px';

export default sheet({
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '300px',
    padding: '5px',
    zIndex: zIndexes.get('above-backdrop'),
    boxSizing: 'border-box'
  },
  calendar_notFlat: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: `translateY(100%)`,
    ...standardShadow
  },
  calendar_readOnly: {
    button: {
      cursor: 'default'
    }
  },
  controls: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  shiftButton: {
    padding: '3px 15px',
    '&:hover': {
      backgroundColor: darken(darkenAmount, calendarViewShiftButtonBackground)
    }
  },
  view: {
    display: 'flex',
    flexFlow: 'wrap'
  },
  viewOption: {
    textAlign: 'center',
    border: '1px solid transparent',
    boxSizing: 'border-box',
    paddingTop: buttonPadding,
    paddingBottom: buttonPadding,
    cursor: 'pointer'
  },
  viewOption_day: {
    width: 'calc(100% / 7)'
  },
  viewOption_month: {
    width: 'calc(100% / 3)'
  },
  viewOption_dummyDay: {
    zIndex: -1,
    backgroundColor: 'inherit !important'
  },
  viewOption_notHeaderNotDummy: {
    borderColor: calendarButtonBorderColour
  },
  viewOption_header: {
    padding: '5px 0',
    cursor: 'default'
  },
  viewOption_disabled: {
    backgroundColor: `${disabledBackground} !important`,
    color: `${disabledColour} !important`,
    cursor: 'default'
  },
  viewOption_selected: {
    backgroundColor: calendarSelectedDayBackground,
    color: calendarSelectedDayColour
  }
});
