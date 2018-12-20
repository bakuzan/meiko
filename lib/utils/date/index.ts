import adjustDateMonth from './adjustDateMonth';
import adjustDateYear from './adjustDateYear';
import areEqual from './areEqual';
import checkIfDatePartsMatch from './checkIfDatePartsMatch';
import startOfDay from './startOfDay';
import endOfDay from './endOfDay';
import setTimeForDate from './setTimeForDate';
import * as DateFormat from './formatting';
import getDatesAsMsAtMidnight from './getDatesAsMsAtMidnight';
import getDayName from './getDayName';
import getDaysInMonthForDate from './getDaysInMonthForDate';
import {
  daysDifferentBetweenDates,
  getDifferenceFromMonday,
  getDifferenceFromSunday
} from './getDifference';
import getFirstDateOfMonth from './getFirstDateOfMonth';
import getLastDateOfMonth from './getLastDateOfMonth';
import getMonthName from './getMonthName';
import { isBefore, isBeforeOrEqual } from './isBefore';
import weekBeginning from './getWeekBeginning';
import weekEnding from './getWeekEnding';

export {
  adjustDateMonth,
  adjustDateYear,
  areEqual,
  checkIfDatePartsMatch,
  startOfDay,
  endOfDay,
  DateFormat,
  getDatesAsMsAtMidnight,
  getDayName,
  getDaysInMonthForDate,
  daysDifferentBetweenDates,
  getDifferenceFromMonday,
  getDifferenceFromSunday,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  getMonthName,
  isBefore,
  isBeforeOrEqual,
  weekEnding,
  weekBeginning,
  setTimeForDate
};

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
