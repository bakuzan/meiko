import weekBeginning from './getWeekBeginning';
import weekEnding from './getWeekEnding';

export const MS_DAY = 60 * 60 * 24 * 1000;

export const daysDifferentBetweenDates = (d1, d2) => {
  const a = new Date(d1);
  const b = new Date(d2);

  return Math.floor(b - a) / MS_DAY;
};
export const getDifferenceFromMonday = (date) =>
  Math.abs(daysDifferentBetweenDates(date, weekBeginning(date)));

export const getDifferenceFromSunday = (date) =>
  Math.abs(daysDifferentBetweenDates(weekEnding(date), date));
