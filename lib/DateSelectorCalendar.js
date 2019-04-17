import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from './Button';
import Icons from './constants/icons';
import Strings from './constants/strings';
import { ViewOptionEnum } from './constants/enums';
import { formatDateForInput, adjustDateMonth, adjustDateYear } from './utils';
import * as CalendarUtils from './utils/calendar';
import addOutsideClick from './utils/addOutsideClick';

import styles from './styles/DateSelectorCalendar';

const PREV = -1;
const NEXT = 1;
const viewHeaders = [
  ...Strings.dayNames.slice(1),
  ...Strings.dayNames.slice(0, 1)
].map((str) => str.slice(0, 3));

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const date = formatDateForInput(props.selected || new Date());
    this.state = {
      viewDate: date,
      selectedDate: date,
      isMonthView: true,
      blockOutsideClick: false
    };

    this.calendarContainer = null;
    this.removeOutsideListeners = null;
    this.handleRef = this.handleRef.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.handleViewShift = this.handleViewShift.bind(this);
    this.handleViewOptionSelect = this.handleViewOptionSelect.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const selectedDate = formatDateForInput(nextProps.selected);
    const prevSelected = prevState.selectedDate;
    if (selectedDate !== prevSelected) {
      return { selectedDate };
    }

    return null;
  }

  componentDidUpdate() {
    if (!this.removeOutsideListeners && !this.state.blockOutsideClick) {
      this.removeOutsideListeners = addOutsideClick(
        this.calendarContainer,
        this.handleClose
      );
    }
  }

  componentWillUnmount() {
    this.removeOutsideListeners && this.removeOutsideListeners();
  }

  handleRef(el) {
    this.calendarContainer = el;
    this.setState({ blockOutsideClick: false });
  }

  handleClose(event) {
    const { className } = event.target;
    if (className.includes('mko-calendar')) {
      // This is because view switching removes the nodes from the DOM
      // and breaks the decendant checker
      return;
    }
    this.props.onClose();
  }

  toggleViewMode() {
    if (this.props.disabled) {
      return;
    }

    this.setState((prev) => ({ isMonthView: !prev.isMonthView }));
  }

  handleViewShift(direction) {
    return () => {
      if (this.props.disabled) {
        return;
      }

      const { isMonthView, viewDate: oldViewDate } = this.state;
      const viewDate = isMonthView
        ? adjustDateMonth(oldViewDate, direction)
        : adjustDateYear(oldViewDate, direction);
      this.setState({ viewDate });
    };
  }

  handleViewOptionSelect(option) {
    if (this.props.disabled) {
      return;
    }

    const oldViewStr = this.state.viewDate;
    const oldViewDate = new Date(oldViewStr);
    if (option.optionType === ViewOptionEnum.DAY) {
      const viewDate = new Date(
        oldViewDate.getFullYear(),
        oldViewDate.getMonth(),
        option.text
      );

      this.setState({ viewDate });
      this.props.onSelect(formatDateForInput(viewDate));
    } else if (option.optionType === ViewOptionEnum.MONTH) {
      const monthIndex = Strings.monthNames.findIndex((x) => x === option.text);
      const viewDate = new Date(oldViewDate.getFullYear(), monthIndex, 1);

      this.setState({ isMonthView: true, viewDate });
    }
  }

  render() {
    const { isMonthView, viewDate } = this.state;
    const {
      id,
      className,
      isFlat,
      disabled,
      afterDate,
      beforeDate
    } = this.props;
    const isReadOnly = !this.props.onSelect || disabled;
    const dateRange = { afterDate, beforeDate };
    const isViewOptionSelected = CalendarUtils.checkIfSelectedForView(
      this.state
    );
    const viewOptions = isMonthView
      ? CalendarUtils.getDaysForDate(viewDate)
      : CalendarUtils.getMonthsForDate();

    const prevLabel = `Move to previous ${isMonthView ? 'year' : 'month'}`;
    const nextLabel = `Move to next ${isMonthView ? 'year' : 'month'}`;

    return (
      <div ref={this.handleRef}>
        <div
          id={`${id}-calendar`}
          className={classNames(
            'mko-calendar',
            {
              'mko-calendar--read-only': isReadOnly
            },
            styles.calendar,
            isReadOnly && styles.calendar_readOnly,
            !isFlat && styles.calendar_notFlat,
            className
          )}
        >
          <div
            className={classNames('mko-calendar__controls', styles.controls)}
          >
            <Button
              className={classNames(
                'mko-calendar__shift-button',
                styles.shiftButton
              )}
              aria-label={prevLabel}
              icon={Icons.left}
              onClick={this.handleViewShift(PREV)}
            />
            <Button onClick={this.toggleViewMode}>
              {isMonthView && CalendarUtils.displayMonthAndYear(viewDate)}
              {!isMonthView && CalendarUtils.displayYearOnly(viewDate)}
            </Button>
            <Button
              className={classNames(
                'mko-calendar__shift-button',
                styles.shiftButton
              )}
              aria-label={nextLabel}
              icon={Icons.right}
              onClick={this.handleViewShift(NEXT)}
            />
          </div>
          <div className={classNames('mko-calendar__view', styles.view)}>
            {isMonthView &&
              viewHeaders.map((header) => (
                <div
                  key={header}
                  className={classNames(
                    'mko-calendar__view-option',
                    'mko-calendar__view-option--day',
                    'mko-calendar__view-option--header',
                    styles.viewOption,
                    styles.viewOption_day,
                    styles.viewOption_header
                  )}
                >
                  {header}
                </div>
              ))}
            {viewOptions.map((option) => {
              const isDummyDay = option.optionType === ViewOptionEnum.DUMMY_DAY;
              const isOutOfRange = CalendarUtils.dateIsOutOfRange(
                this.state,
                option,
                dateRange
              );
              const isSelected = isViewOptionSelected(option);
              const disableDate = isDummyDay || isOutOfRange;
              const title = isOutOfRange ? 'Out of range' : '';
              const ariaLabel = isOutOfRange
                ? title
                : option.text
                ? CalendarUtils.addDateSuffix(
                    isMonthView,
                    this.state.viewDate,
                    option.text
                  )
                : null;

              return (
                <div
                  key={option.key}
                  className={classNames(
                    'mko-calendar__view-option',
                    {
                      'mko-calendar__view-option--day': isMonthView,
                      'mko-calendar__view-option--month': !isMonthView,
                      'mko-calendar__view-option--dummy-day': isDummyDay
                    },
                    styles.viewOption,
                    isMonthView && styles.viewOption_day,
                    !isMonthView && styles.viewOption_month,
                    isDummyDay && styles.viewOption_dummyDay,
                    !isDummyDay && styles.viewOption_notHeaderNotDummy
                  )}
                >
                  <Button
                    className={classNames(
                      'mko-calendar__view-button',
                      {
                        'mko-calendar__view-button--selected': isSelected
                      },
                      styles.viewButton,
                      isSelected && styles.viewButton_selected
                    )}
                    title={title}
                    aria-label={ariaLabel}
                    onClick={() => this.handleViewOptionSelect(option)}
                    disabled={disableDate}
                  >
                    {option.text}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

Calendar.displayName = 'Calendar';
Calendar.defaultProps = {
  isFlat: false
};
Calendar.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.string,
  afterDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  beforeDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isFlat: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func
};

export default Calendar;
