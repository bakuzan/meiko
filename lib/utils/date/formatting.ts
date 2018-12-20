import { Strings } from '../../constants';

import padNumber from '../padNumber';

const formatTime = (date: string | number | Date) =>
  date
    ? `${padNumber(new Date(date).getHours(), 2)}:${padNumber(
        new Date(date).getMinutes(),
        2
      )}`
    : '';

export const dateAsMs = (d: string | number | Date) => new Date(d).getTime();

export const formatDateForDisplay = (date: string | number | Date) => {
  if (!date) {
    return '';
  }

  const d = new Date(date);
  return `${padNumber(d.getDate(), 2)} ${
    Strings.monthNames[d.getMonth()]
  } ${d.getFullYear()}`;
};

export const formatDateTimeForDisplay = (date: string | number | Date) =>
  `${formatDateForDisplay(date)} @ ${formatTime(date)}`;

export const formatDateForInput = (d: string | number | Date) => {
  if (!d) {
    return '';
  }

  const date = new Date(d);
  return `${date.getFullYear()}-${padNumber(
    date.getMonth() + 1,
    2
  )}-${padNumber(date.getDate(), 2)}`;
};

export const formatDateISO = (d: string | number | Date) =>
  `${formatDateForInput(d)}T${formatTime(d)}`;
