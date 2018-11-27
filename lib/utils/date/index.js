import _adjustDateMonth from './adjustDateMonth';
import _adjustDateYear from './adjustDateYear';
import _areEqual from './areEqual';
import _checkIfDatePartsMatch from './checkIfDatePartsMatch';
import _startOfDay from './startOfDay';
import _endOfDay from './endOfDay';
import _setTimeForDate from './setTimeForDate';
import * as _Format from './formatting';
import _getDatesAsMsAtMidnight from './getDatesAsMsAtMidnight';
import _getDayName from './getDayName';
import _getDaysInMonthForDate from './getDaysInMonthForDate';
import {
  daysDifferentBetweenDates as _daysDifferentBetweenDates,
  getDifferenceFromMonday as _getDifferenceFromMonday,
  getDifferenceFromSunday as _getDifferenceFromSunday
} from './getDifference';
import _getFirstDateOfMonth from './getFirstDateOfMonth';
import _getLastDateOfMonth from './getLastDateOfMonth';
import _getMonthName from './getMonthName';
import {
  isBefore as _isBefore,
  isBeforeOrEqual as _isBeforeOrEqual
} from './isBefore';
import _weekBeginning from './getWeekBeginning';
import _weekEnding from './getWeekEnding';

export const adjustDateMonth = _adjustDateMonth;
export const adjustDateYear = _adjustDateYear;
export const areEqual = _areEqual;
export const checkIfDatePartsMatch = _checkIfDatePartsMatch;
export const startOfDay = _startOfDay;
export const endOfDay = _endOfDay;
export const DateFormat = _Format;
export const getDatesAsMsAtMidnight = _getDatesAsMsAtMidnight;
export const getDayName = _getDayName;
export const getDaysInMonthForDate = _getDaysInMonthForDate;
export const daysDifferentBetweenDates = _daysDifferentBetweenDates;
export const getDifferenceFromMonday = _getDifferenceFromMonday;
export const getDifferenceFromSunday = _getDifferenceFromSunday;
export const getFirstDateOfMonth = _getFirstDateOfMonth;
export const getLastDateOfMonth = _getLastDateOfMonth;
export const getMonthName = _getMonthName;
export const isBefore = _isBefore;
export const isBeforeOrEqual = _isBeforeOrEqual;
export const weekEnding = _weekEnding;
export const weekBeginning = _weekBeginning;
export const setTimeForDate = _setTimeForDate;

// Date processing - TODO move to erza?

const BAD_BLANK_MAL_DATE = '0000-00-00';
const BAD_MAL_DATE_PART = '-00';

const isNotBadMalDate = (s) =>
  s !== BAD_BLANK_MAL_DATE && s.indexOf(BAD_MAL_DATE_PART) === -1;

export const dateStringToISOString = (s) =>
  !!s && isNotBadMalDate(s) ? new Date(s).toISOString() : null;

export const preventDatesPre1970 = (d) =>
  !!dateStringToISOString(d) && new Date(d) >= new Date('1970-01-01')
    ? dateStringToISOString(d)
    : null;
