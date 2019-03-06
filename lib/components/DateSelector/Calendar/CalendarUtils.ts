import Strings from '../../../constants/strings';
import { ViewOptionEnum } from '../../../constants/enums';
import {
  getDifferenceFromMonday,
  getDifferenceFromSunday,
  generateUniqueId,
  checkIfDatePartsMatch,
  getMonthName,
  getDaysInMonthForDate,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  isBefore,
  isBeforeOrEqual
} from '../../../utils';

export interface ICalendarState {
  viewDate: string | Date;
  selectedDate: string;
  isMonthView: boolean;
}

export const mapToViewOption = (optionType: ViewOptionEnum) => (
  text: string | number
) => ({
  key: generateUniqueId(),
  text,
  optionType
});

export const displayYearOnly = (d: string | number | Date) =>
  new Date(d).getFullYear();
export const displayMonthAndYear = (d: string | number | Date) =>
  `${getMonthName(d)} ${displayYearOnly(d)}`;

export const getMonthsForDate = () =>
  Strings.monthNames.map(mapToViewOption(ViewOptionEnum.MONTH));

export const getDaysForDate = (date: string | number | Date) => {
  const d = new Date(date);
  const monthLength = getDaysInMonthForDate(d);
  const firstOfMonth = getFirstDateOfMonth(d);
  const lastOfMonth = getLastDateOfMonth(d);
  const startDummyDays = getDifferenceFromMonday(firstOfMonth);
  const endDummyDays = getDifferenceFromSunday(lastOfMonth);
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

export const checkIfSelectedForView = (state: ICalendarState) => (option) => {
  const selectedDate = new Date(state.selectedDate);
  const matches = checkIfDatePartsMatch(state.viewDate, state.selectedDate);
  return (
    (option.optionType === ViewOptionEnum.DAY &&
      matches.year &&
      matches.month &&
      option.text === selectedDate.getDate()) ||
    (option.optionType === ViewOptionEnum.MONTH &&
      matches.year &&
      Strings.monthNames.findIndex((x) => x === option.text) ===
        selectedDate.getMonth())
  );
};

export const checkDatesAgainstRange = (
  { afterDate, beforeDate },
  ...comparisons
) => {
  const [afterCheck, beforeCheck] = comparisons;
  return (
    (afterDate && isBefore(afterCheck, afterDate)) ||
    (beforeDate && !isBeforeOrEqual(beforeCheck || afterCheck, beforeDate))
  );
};

export const dateIsOutOfRange = (state, option, { afterDate, beforeDate }) => {
  const { isMonthView, viewDate } = state;
  const { text: value } = option;

  if ((!afterDate && !beforeDate) || !value) {
    return false;
  }

  if (isMonthView) {
    const date = new Date(viewDate);
    date.setDate(value);
    return checkDatesAgainstRange({ afterDate, beforeDate }, date);
  } else {
    const d = new Date(viewDate);
    d.setDate(1);
    d.setMonth(Strings.monthNames.findIndex((x) => x === value));
    const firstOfMonth = getFirstDateOfMonth(d);
    const lastOfMonth = getLastDateOfMonth(d);
    return checkDatesAgainstRange(
      { afterDate, beforeDate },
      lastOfMonth,
      firstOfMonth
    );
  }
};
