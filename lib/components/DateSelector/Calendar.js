import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import Button from 'components/Button/Button';
import Icons from 'constants/icons';
import Strings from 'constants/strings';
import { generateUniqueId } from 'utils/common';
import * as DateUtils from 'utils/date';
import styles from './Calendar.scss';

const cx = classNames.bind(styles);

const PREV = -1;
const NEXT = 1;
const ViewOptionEnum = {
  DUMMY_DAY: 1,
  DAY: 2,
  MONTH: 3
};
const mapToViewOption = optionType => text => ({
  key: generateUniqueId(),
  text,
  optionType
});

const displayYearOnly = d => new Date(d).getFullYear();
const displayMonthAndYear = d =>
  `${DateUtils.getMonthName(d)} ${displayYearOnly(d)}`;
const getMonthsForDate = () =>
  Strings.monthNames.map(mapToViewOption(ViewOptionEnum.MONTH));

const getDaysForDate = date => {
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

const checkIfSelectedForView = state => option => {
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

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const date = DateUtils.formatDateForInput(props.selected || new Date());
    this.state = {
      viewDate: date,
      selectedDate: date,
      isMonthView: true
    };

    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.handleViewShift = this.handleViewShift.bind(this);
    this.handleViewOptionSelect = this.handleViewOptionSelect.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const selectedDate = DateUtils.formatDateForInput(nextProps.selected);
    const prevSelected = prevState.selectedDate;
    if (selectedDate !== prevSelected) {
      return { selectedDate };
    }

    return null;
  }

  toggleViewMode() {
    this.setState(prev => ({ isMonthView: !prev.isMonthView }));
  }

  handleViewShift(direction) {
    return () => {
      const { isMonthView, viewDate: oldViewDate } = this.state;
      const viewDate = isMonthView
        ? DateUtils.adjustDateMonth(oldViewDate, direction)
        : DateUtils.adjustDateYear(oldViewDate, direction);
      this.setState({ viewDate });
    };
  }

  handleViewOptionSelect(option) {
    const oldViewStr = this.state.viewDate;
    const oldViewDate = new Date(oldViewStr);
    if (option.optionType === ViewOptionEnum.DAY) {
      const viewDate = new Date(
        oldViewDate.getFullYear(),
        oldViewDate.getMonth(),
        option.text
      );
      this.setState({ viewDate });
      this.props.onSelect(DateUtils.formatDateForInput(viewDate));
    } else if (option.optionType === ViewOptionEnum.MONTH) {
      const monthIndex = Strings.monthNames.findIndex(x => x === option.text);
      const viewDate = new Date(oldViewDate.getFullYear(), monthIndex, 1);
      this.setState({ isMonthView: true, viewDate });
    }
  }

  render() {
    const { isMonthView, viewDate } = this.state;
    const { id, className } = this.props;
    const isReadOnly = !this.props.onSelect;
    const isViewOptionSelected = checkIfSelectedForView(this.state);
    const viewOptions = isMonthView
      ? getDaysForDate(viewDate)
      : getMonthsForDate(viewDate);

    return (
      <div
        id={`${id}-calendar`}
        className={cx(className, 'calendar', { 'read-only': isReadOnly })}
      >
        <div className={cx('calendar-view-controls')}>
          <Button icon={Icons.left} onClick={this.handleViewShift(PREV)} />
          <Button onClick={this.toggleViewMode}>
            {isMonthView && displayMonthAndYear(viewDate)}
            {!isMonthView && displayYearOnly(viewDate)}
          </Button>
          <Button icon={Icons.right} onClick={this.handleViewShift(NEXT)} />
        </div>
        <div className={cx('calendar-view')}>
          {viewOptions.map(option => (
            <div
              key={option.key}
              className={cx('calendar-view-option', {
                day: isMonthView,
                month: !isMonthView,
                selected: isViewOptionSelected(option)
              })}
            >
              <Button
                onClick={() => this.handleViewOptionSelect(option)}
                disabled={option.optionType === ViewOptionEnum.DUMMY_DAY}
              >
                {option.text}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func
};

export default Calendar;
