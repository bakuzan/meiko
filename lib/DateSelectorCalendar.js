import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from './Button';
import TabTrap from './TabTrap';
import Icons from './constants/icons';
import Strings from './constants/strings';
import {
  ViewOptionEnum,
  EventCodes,
  OPEN_KEYS,
  ARROW_KEYS
} from './constants/enums';
import {
  formatDateForInput,
  adjustDateDay,
  adjustDateMonth,
  adjustDateYear,
  getFirstDateOfMonth,
  checkIfDatePartsMatch,
  startOfDay
} from './utils';
import * as CalendarUtils from './utils/calendar';
import addOutsideClick from './utils/addOutsideClick';

import styles from './styles/DateSelectorCalendar';

const PREV = -1;
const NEXT = 1;
const viewHeaders = [
  ...Strings.dayNames.slice(1),
  ...Strings.dayNames.slice(0, 1)
].map((str) => str.slice(0, 3));

const generateElementIdBase = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const date = formatDateForInput(props.selected || new Date());
    this.state = {
      idBase: generateElementIdBase(),
      viewDate: date,
      focusDate: date,
      selectedDate: date,
      isMonthView: true,
      blockOutsideClick: false
    };

    this.calendarContainer = { current: null };
    this.removeOutsideListeners = null;
    this.handleRef = this.handleRef.bind(this);
    this.turnOutsideClickOn = this.turnOutsideClickOn.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.handleViewShift = this.handleViewShift.bind(this);
    this.handleViewOptionSelect = this.handleViewOptionSelect.bind(this);
    this.getTabIndexForOption = this.getTabIndexForOption.bind(this);
    this.handleCalendarNavigation = this.handleCalendarNavigation.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const selectedDate = formatDateForInput(nextProps.selected);
    const prevSelected = prevState.selectedDate;

    if (selectedDate !== prevSelected) {
      return { selectedDate };
    }

    return null;
  }

  componentWillUnmount() {
    if (this.removeOutsideListeners) {
      this.removeOutsideListeners();
    }

    requestAnimationFrame(() => {
      const btn = document.getElementById(`${this.props.id}-calendarButton`);

      if (btn) {
        btn.focus();
      }
    });
  }

  handleRef(el) {
    this.calendarContainer.current = el;
    requestAnimationFrame(() => this.turnOutsideClickOn());
  }

  turnOutsideClickOn() {
    if (!this.removeOutsideListeners && !this.state.blockOutsideClick) {
      this.removeOutsideListeners = addOutsideClick(
        this.calendarContainer.current,
        this.handleClose
      );
    }
  }

  handleClose(event) {
    const { className } = event.target;
    const notEscape = event.key !== EventCodes.Escape;

    if (className.includes('mko-calendar') && notEscape) {
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

    this.setState((prev) => {
      const matches = checkIfDatePartsMatch(
        prev.viewDate,
        this.state.selectedDate
      );

      return {
        isMonthView: !prev.isMonthView,
        focusDate: new Date(
          matches.year && matches.month
            ? this.state.selectedDate
            : prev.viewDate
        )
      };
    });
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

      this.setState({
        viewDate: getFirstDateOfMonth(viewDate),
        focusDate: new Date(viewDate)
      });
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
      const matches = checkIfDatePartsMatch(viewDate, this.state.selectedDate);

      this.setState(
        {
          isMonthView: true,
          viewDate: getFirstDateOfMonth(viewDate),
          focusDate: new Date(
            matches.year && matches.month ? this.state.selectedDate : viewDate
          )
        },
        this.setFocus
      );
    }
  }

  getTabIndexForOption(option) {
    const viewDate = startOfDay(this.state.viewDate);
    const focusDate = startOfDay(this.state.focusDate);
    let optionDate = null;

    if (option.optionType === ViewOptionEnum.DAY) {
      optionDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        option.text
      );
    } else if (option.optionType === ViewOptionEnum.MONTH) {
      const monthIndex = Strings.monthNames.findIndex((x) => x === option.text);

      optionDate = new Date(viewDate.getFullYear(), monthIndex, 1);
    }

    if (focusDate === null || optionDate === null) {
      return -1;
    }

    if (this.state.isMonthView) {
      return focusDate.getTime() === optionDate.getTime() ? 0 : -1;
    } else {
      return focusDate.getMonth() === optionDate.getMonth() ? 0 : -1;
    }
  }

  handleCalendarNavigation(event) {
    const { key } = event;
    const currFocusDate = new Date(this.state.focusDate);
    let newDate = null;

    if (ARROW_KEYS.includes(key)) {
      event.preventDefault();
    }

    switch (key) {
      case EventCodes.ArrowUp:
        newDate = this.state.isMonthView
          ? adjustDateDay(currFocusDate, -7)
          : adjustDateMonth(currFocusDate, -3);
        break;
      case EventCodes.ArrowDown:
        newDate = this.state.isMonthView
          ? adjustDateDay(currFocusDate, 7)
          : adjustDateMonth(currFocusDate, 3);
        break;
      case EventCodes.ArrowLeft:
        newDate = this.state.isMonthView
          ? adjustDateDay(currFocusDate, -1)
          : adjustDateMonth(currFocusDate, -1);
        break;
      case EventCodes.ArrowRight:
        newDate = this.state.isMonthView
          ? adjustDateDay(currFocusDate, 1)
          : adjustDateMonth(currFocusDate, 1);
        break;
      default:
        break;
    }

    if (!newDate) {
      return;
    }

    this.setState(
      {
        viewDate: getFirstDateOfMonth(newDate),
        focusDate: new Date(newDate)
      },
      this.setFocus
    );
  }

  setFocus() {
    requestAnimationFrame(() => {
      const container = this.calendarContainer.current;
      const focusDate = new Date(this.state.focusDate);

      const dx = this.state.isMonthView
        ? focusDate.getDate()
        : Strings.monthNames[focusDate.getMonth()];

      const target = container.querySelector(`[data-date='${dx}']`);

      if (target) {
        target.focus();
      }
    });
  }

  render() {
    const { isMonthView, viewDate, idBase } = this.state;
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

    const calendarOptions = viewOptions.map((option) => {
      const isDummyDay = option.optionType === ViewOptionEnum.DUMMY_DAY;
      const isOutOfRange = CalendarUtils.dateIsOutOfRange(
        this.state,
        option,
        dateRange
      );

      const isSelected = isViewOptionSelected(option);
      const disableDate = isDummyDay || isOutOfRange;
      const title = isOutOfRange ? 'Out of range' : '';
      const tabIndex = this.getTabIndexForOption(option);
      const ariaLabel = isOutOfRange
        ? title
        : option.text
        ? CalendarUtils.addDateSuffix(
            isMonthView,
            this.state.viewDate,
            option.text
          )
        : null;

      return {
        option,
        isSelected,
        disableDate,
        title,
        ariaLabel,
        isDummyDay,
        isOutOfRange,
        tabIndex
      };
    });

    const focusableOption = calendarOptions.find((x) => x.tabIndex === 0);
    const lastIdKey = focusableOption
      ? focusableOption.option.text || focusableOption.option.key
      : 'next';

    const prevLabel = `Move to previous ${isMonthView ? 'month' : 'year'}`;
    const nextLabel = `Move to next ${isMonthView ? 'month' : 'year'}`;

    return (
      <TabTrap
        ref={this.handleRef}
        isActive={!isFlat && !!idBase}
        firstId={`${idBase}_prev`}
        lastId={`${idBase}_${lastIdKey}`}
        role="application"
        aria-roledescription="datepicker"
        aria-label="Calendar"
        onKeyDown={this.handleCalendarNavigation}
      >
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
              id={`${idBase}_prev`}
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
              id={`${idBase}_next`}
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
            {calendarOptions.map((data) => {
              const {
                option,
                isDummyDay,
                isSelected,
                title,
                ariaLabel,
                disableDate
              } = data;
              const opId = option.text || option.key;

              return (
                <div
                  key={opId}
                  id={`${idBase}_${opId}`}
                  className={classNames(
                    'mko-calendar__view-option',
                    {
                      'mko-calendar__view-option--day': isMonthView,
                      'mko-calendar__view-option--month': !isMonthView,
                      'mko-calendar__view-option--disabled': disableDate,
                      'mko-calendar__view-option--dummy-day': isDummyDay,
                      'mko-calendar__view-option--selected': isSelected
                    },
                    styles.viewOption,
                    isMonthView && styles.viewOption_day,
                    !isMonthView && styles.viewOption_month,
                    disableDate && styles.viewOption_disabled,
                    isDummyDay && styles.viewOption_dummyDay,
                    !isDummyDay && styles.viewOption_notHeaderNotDummy,
                    isSelected && styles.viewOption_selected
                  )}
                  data-date={option.text}
                  tabIndex={data.tabIndex}
                  title={title}
                  role="button"
                  aria-label={ariaLabel}
                  aria-disabled={disableDate}
                  onClick={() => {
                    if (!disableDate) {
                      this.handleViewOptionSelect(option);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (OPEN_KEYS.includes(event.key)) {
                      event.preventDefault();
                      this.handleViewOptionSelect(option);
                    }
                  }}
                >
                  {option.text}
                </div>
              );
            })}
          </div>
        </div>
      </TabTrap>
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
