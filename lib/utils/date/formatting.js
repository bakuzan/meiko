import { Strings } from 'constants';

import padNumber from '../padNumber';

const formatTime = (date) =>
  date
    ? `${padNumber(new Date(date).getHours(), 2)}:${padNumber(
        new Date(date).getMinutes(),
        2
      )}`
    : '';

export const dateAsMs = (d) => new Date(d).getTime();

export const formatDateForDisplay = (date) => {
  if (!date) {
    return '';
  }

  const d = new Date(date);
  return `${padNumber(d.getDate(), 2)} ${
    Strings.monthNames[d.getMonth()]
  } ${d.getFullYear()}`;
};

export const formatDateTimeForDisplay = (date) =>
  `${formatDateForDisplay(date)} @ ${formatTime(date)}`;

export const formatDateForInput = (d) => {
  if (!d) {
    return '';
  }

  const date = new Date(d);
  return `${date.getFullYear()}-${padNumber(
    date.getMonth() + 1,
    2
  )}-${padNumber(date.getDate(), 2)}`;
};

export const formatDateISO = (d) => `${formatDateForInput(d)}T${formatTime(d)}`;
