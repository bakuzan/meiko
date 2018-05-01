import Strings from 'constants/strings';
import { generateUniqueId } from 'utils/common';
import * as DateUtils from 'utils/date';

export const ViewOptionEnum = {
  DUMMY_DAY: 1,
  DAY: 2,
  MONTH: 3
};
export const mapToViewOption = optionType => text => ({
  key: generateUniqueId(),
  text,
  optionType
});

export const displayYearOnly = d => new Date(d).getFullYear();
export const displayMonthAndYear = d =>
  `${DateUtils.getMonthName(d)} ${displayYearOnly(d)}`;

export const getMonthsForDate = () =>
  Strings.monthNames.map(mapToViewOption(ViewOptionEnum.MONTH));

export const getDaysForDate = date => {
  const d = new Date(date);
  const monthLength = DateUtils.getDaysInMonthForDate(d);
  const firstOfMonth = DateUtils.getFirstDateOfMonth(d);
  const lastOfMonth = DateUtils.getLastDateOfMonth(d);
  const startDummyDays = DateUtils.getDifferenceFromMonday(firstOfMonth);
  const endDummyDays = DateUtils.getDifferenceFromSunday(lastOfMonth);
  return [
    ...Array(startDummyDays)
      .fill('')
      .map(mapToViewOption(ViewOptionEnum.DUMMY_DAY)),
    ...Array(monthLength)
      .fill(null)
      .map((x, num) => num + 1)
      .map(mapToViewOption(ViewOptionEnum.DAY)),
    ...Array(endDummyDays)
      .fill('')
      .map(mapToViewOption(ViewOptionEnum.DUMMY_DAY))
  ];
};

export const checkIfSelectedForView = state => option => {
  const selectedDate = new Date(state.selectedDate);
  const matches = DateUtils.checkIfDatePartsMatch(
    state.viewDate,
    state.selectedDate
  );
  return (
    (option.optionType === ViewOptionEnum.DAY &&
      matches.year &&
      matches.month &&
      option.text === selectedDate.getDate()) ||
    (option.optionType === ViewOptionEnum.MONTH &&
      matches.year &&
      Strings.monthNames.findIndex(x => x === option.text) ===
        selectedDate.getMonth())
  );
};

export const checkDatesAgainstRange = (
  { afterDate, beforeDate },
  ...comparisons
) => {
  const [afterCheck, beforeCheck] = comparisons;
  return (
    (afterDate && DateUtils.isBefore(afterCheck, afterDate)) ||
    (beforeDate &&
      !DateUtils.isBeforeOrEqual(beforeCheck || afterCheck, beforeDate))
  );
};

export const dateIsOutOfRange = (state, option, { afterDate, beforeDate }) => {
  const { isMonthView, viewDate } = state;
  const { text: value } = option;
  if ((!afterDate && !beforeDate) || !value) return false;

  if (isMonthView) {
    const date = new Date(viewDate);
    date.setDate(value);
    return checkDatesAgainstRange({ afterDate, beforeDate }, date);
  } else {
    const d = new Date(viewDate);
    d.setDate(1);
    d.setMonth(Strings.monthNames.findIndex(x => x === value));
    const firstOfMonth = DateUtils.getFirstDateOfMonth(d);
    const lastOfMonth = DateUtils.getLastDateOfMonth(d);
    return checkDatesAgainstRange(
      { afterDate, beforeDate },
      lastOfMonth,
      firstOfMonth
    );
  }
};