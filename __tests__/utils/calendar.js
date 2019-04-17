import {
  mapToViewOption,
  displayYearOnly,
  displayMonthAndYear,
  getMonthsForDate,
  checkDatesAgainstRange,
  checkIfSelectedForView,
  getDaysForDate,
  dateIsOutOfRange,
  addDateSuffix
} from '../../lib/utils/calendar';

jest.mock('../../lib/utils', () => ({
  getDifferenceFromMonday: jest.fn(() => 0),
  getDifferenceFromSunday: jest.fn(() => 5),
  generateUniqueId: jest.fn(),
  checkIfDatePartsMatch: jest.fn(() => ({
    year: true,
    month: true,
    date: false
  })),
  getMonthName: jest.fn(),
  getDaysInMonthForDate: jest.fn(() => 30),
  getFirstDateOfMonth: jest.fn(() => 1),
  getLastDateOfMonth: jest.fn(() => 30),
  isBefore: jest.fn(),
  isBeforeOrEqual: jest.fn()
}));

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
} from '../../lib/utils';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('mapToViewOption', () => {
  it('should return a view option model', function() {
    const optionType = 'jest';
    const text = 'test';

    const result = mapToViewOption(optionType)(text);

    expect(result.optionType).toEqual(optionType);
    expect(result.text).toEqual(text);
    expect(generateUniqueId).toHaveBeenCalled();
  });
});

describe('displayYearOnly', () => {
  it('should return a year for date', function() {
    expect(displayYearOnly(new Date('2019-01-01'))).toEqual(2019);
    expect(displayYearOnly(new Date('2000-01-01'))).toEqual(2000);
    expect(displayYearOnly(new Date('1992-01-01'))).toEqual(1992);
  });
});

describe('displayMonthAndYear', () => {
  it('should return month and year for date', function() {
    expect(displayMonthAndYear(new Date('2019-01-01'))).toEqual(
      'undefined 2019'
    );
    expect(displayMonthAndYear(new Date('2000-03-01'))).toEqual(
      'undefined 2000'
    );
    expect(displayMonthAndYear(new Date('1992-06-01'))).toEqual(
      'undefined 1992'
    );
    expect(getMonthName).toHaveBeenCalledTimes(3);
  });
});

describe('getMonthsForDate', () => {
  it('should return month view options', function() {
    getMonthsForDate();
    expect(generateUniqueId).toHaveBeenCalledTimes(12);
  });
});

describe('getDaysForDate', () => {
  it('should return days view options', function() {
    const result = getDaysForDate(new Date('2019-04-05'));

    expect(result.length).toEqual(30 + 5); //days in month + placeholders
    expect(getDaysInMonthForDate).toHaveBeenCalled();
    expect(getFirstDateOfMonth).toHaveBeenCalled();
    expect(getLastDateOfMonth).toHaveBeenCalled();
    expect(getDifferenceFromMonday).toHaveBeenCalled();
    expect(getDifferenceFromSunday).toHaveBeenCalled();
  });
});

describe('checkIfSelectedForView', () => {
  it('should return false for non-matching day', function() {
    const selectedDate = new Date('2019-04-05');
    const viewDate = new Date('2019-04-01');
    const option = { optionType: 2, text: 1 };

    const result = checkIfSelectedForView({ selectedDate, viewDate })(option);

    expect(result).toBe(false);
    expect(checkIfDatePartsMatch).toHaveBeenCalled();
  });

  it('should return true for matching day', function() {
    const selectedDate = new Date('2019-04-05');
    const viewDate = new Date('2019-04-01');
    const option = { optionType: 2, text: 5 };

    const result = checkIfSelectedForView({ selectedDate, viewDate })(option);

    expect(result).toBe(true);
    expect(checkIfDatePartsMatch).toHaveBeenCalled();
  });

  it('should return false for non-matching month', function() {
    const selectedDate = new Date('2019-04-05');
    const viewDate = new Date('2019-04-01');
    const option = { optionType: 3, text: 0 };

    const result = checkIfSelectedForView({ selectedDate, viewDate })(option);

    expect(result).toBe(false);
    expect(checkIfDatePartsMatch).toHaveBeenCalled();
  });

  it('should return true for matching month', function() {
    const selectedDate = new Date('2019-04-05');
    const viewDate = new Date('2019-04-01');
    const option = { optionType: 3, text: 'Apr' };

    const result = checkIfSelectedForView({ selectedDate, viewDate })(option);

    expect(result).toBe(true);
    expect(checkIfDatePartsMatch).toHaveBeenCalled();
  });
});

describe('checkDatesAgainstRange', () => {
  it('should return false when no range dates', function() {
    const afterDate = null;
    const beforeDate = null;
    const result = checkDatesAgainstRange(
      { afterDate, beforeDate },
      '2019-12-12'
    );

    expect(result).toBeFalsy();
    expect(isBefore).not.toHaveBeenCalled();
    expect(isBeforeOrEqual).not.toHaveBeenCalled();
  });

  it('should return true for too early date', function() {
    const afterDate = '2019-01-01';
    const beforeDate = '2019-04-05';
    const result = checkDatesAgainstRange(
      { afterDate, beforeDate },
      '2018-12-12'
    );

    expect(result).toBe(true);
    expect(isBefore).toHaveBeenCalled();
    expect(isBeforeOrEqual).toHaveBeenCalled();
  });

  it('should return true for too late date', function() {
    const afterDate = '2019-01-01';
    const beforeDate = '2019-04-05';
    const result = checkDatesAgainstRange(
      { afterDate, beforeDate },
      '2019-12-12'
    );

    expect(result).toBe(true);
    expect(isBefore).toHaveBeenCalled();
    expect(isBeforeOrEqual).toHaveBeenCalled();
  });
});

describe('dateIsOutOfRange', () => {
  it('should return false for dummy days', function() {
    const isMonthView = true;
    const viewDate = '2019-04-05';
    const text = '';
    const afterDate = '';
    const beforeDate = '';

    const result = dateIsOutOfRange(
      { isMonthView, viewDate },
      { text },
      { afterDate, beforeDate }
    );

    expect(result).toBe(false);
  });

  it('should call checkDatesAgainstRange with option date', function() {
    const isMonthView = true;
    const viewDate = '2019-04-05';
    const text = 1;
    const afterDate = '2019-01-01';
    const beforeDate = '2019-04-05';

    const result = dateIsOutOfRange(
      { isMonthView, viewDate },
      { text },
      { afterDate, beforeDate }
    );

    expect(result).toBe(true);
    expect(isBefore).toHaveBeenCalled();
    expect(isBeforeOrEqual).toHaveBeenCalled();
  });

  it('should check if date against the view month', function() {
    const isMonthView = false;
    const viewDate = '2019-04-05';
    const text = 17;
    const afterDate = '2019-01-01';
    const beforeDate = '2019-04-05';

    const result = dateIsOutOfRange(
      { isMonthView, viewDate },
      { text },
      { afterDate, beforeDate }
    );

    expect(result).toBe(true);
    expect(getFirstDateOfMonth).toHaveBeenCalled();
    expect(getLastDateOfMonth).toHaveBeenCalled();
    expect(isBefore).toHaveBeenCalled();
    expect(isBeforeOrEqual).toHaveBeenCalled();
  });
});

describe('addDateSuffix', () => {
  it('should return month and year', () => {
    const expected = 'Jan 2019';

    const result = addDateSuffix(false, new Date('2019-04-17'), 'Jan');

    expect(result).toEqual(expected);
  });

  it('should return date with suffix, month, and year', () => {
    const expected = [
      '1st undefined 2019',
      '2nd undefined 2019',
      '3rd undefined 2019',
      '4th undefined 2019'
    ];

    const results = Array(4)
      .fill(null)
      .map((_, i) => addDateSuffix(true, new Date('2019-04-17'), i + 1));

    results.forEach((result, i) => expect(result).toEqual(expected[i]));
    expect(getMonthName).toHaveBeenCalledTimes(4);
  });
});
