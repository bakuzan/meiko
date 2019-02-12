import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Button } from '../../Button';
import Icons from '../../../constants/icons';
import Strings from '../../../constants/strings';
import { ViewOptionEnum } from '../../../constants/enums';
import * as DateUtils from '../../../utils/date';
import * as CalendarUtils from './CalendarUtils';

import {
  StyledContainer,
  ViewItem,
  ViewContainer,
  ViewControls,
  ViewShiftButton
} from './styles';

const { DateFormat } = DateUtils;

const PREV = -1;
const NEXT = 1;
const viewHeaders = [
  ...Strings.dayNames.slice(1),
  ...Strings.dayNames.slice(0, 1)
].map((str) => str.slice(0, 3));

interface ICalendarProps {
  id?: string;
  className?: string;
  selected: string;
  afterDate: string;
  beforeDate: string;
  disabled: boolean;
  onSelect(date: string): void;
}

class Calendar extends React.Component<
  ICalendarProps,
  CalendarUtils.ICalendarState
> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    selected: PropTypes.string,
    afterDate: PropTypes.string,
    beforeDate: PropTypes.string,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func
  };

  constructor(props: ICalendarProps) {
    super(props);

    const date = DateFormat.formatDateForInput(props.selected || new Date());
    this.state = {
      viewDate: date,
      selectedDate: date,
      isMonthView: true
    };

    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.handleViewShift = this.handleViewShift.bind(this);
    this.handleViewOptionSelect = this.handleViewOptionSelect.bind(this);
  }

  static getDerivedStateFromProps(
    nextProps: ICalendarProps,
    prevState: CalendarUtils.ICalendarState
  ) {
    const selectedDate = DateFormat.formatDateForInput(nextProps.selected);
    const prevSelected = prevState.selectedDate;
    if (selectedDate !== prevSelected) {
      return { selectedDate };
    }

    return null;
  }

  toggleViewMode() {
    if (this.props.disabled) {
      return;
    }

    this.setState((prev) => ({ isMonthView: !prev.isMonthView }));
  }

  handleViewShift(direction: number) {
    return () => {
      if (this.props.disabled) {
        return;
      }

      const { isMonthView, viewDate: oldViewDate } = this.state;
      const viewDate = isMonthView
        ? DateUtils.adjustDateMonth(oldViewDate, direction)
        : DateUtils.adjustDateYear(oldViewDate, direction);
      this.setState({ viewDate });
    };
  }

  handleViewOptionSelect(option: CalendarUtils.IViewOption) {
    if (this.props.disabled) {
      return;
    }

    const oldViewStr = this.state.viewDate;
    const oldViewDate = new Date(oldViewStr);
    if (option.optionType === ViewOptionEnum.DAY) {
      const viewDate = new Date(
        oldViewDate.getFullYear(),
        oldViewDate.getMonth(),
        option.text as number
      );
      this.setState({ viewDate });
      this.props.onSelect(DateFormat.formatDateForInput(viewDate));
    } else if (option.optionType === ViewOptionEnum.MONTH) {
      const monthIndex = Strings.monthNames.findIndex((x) => x === option.text);
      const viewDate = new Date(oldViewDate.getFullYear(), monthIndex, 1);
      this.setState({ isMonthView: true, viewDate });
    }
  }

  render() {
    const { isMonthView, viewDate } = this.state;
    const { id, className, disabled, afterDate, beforeDate } = this.props;
    const isReadOnly = !this.props.onSelect || disabled;
    const dateRange = { afterDate, beforeDate };
    const isViewOptionSelected = CalendarUtils.checkIfSelectedForView(
      this.state
    );
    const viewOptions = isMonthView
      ? CalendarUtils.getDaysForDate(viewDate)
      : CalendarUtils.getMonthsForDate();

    return (
      <StyledContainer
        id={`${id}-calendar`}
        className={classNames(className, 'mei-calendar', {
          'read-only': isReadOnly
        })}
      >
        <ViewControls className={classNames('mei-calendar-view-controls')}>
          <ViewShiftButton
            className={classNames('view-shift-button', 'ripple')}
            icon={Icons.left}
            onClick={this.handleViewShift(PREV)}
          />
          <Button onClick={this.toggleViewMode}>
            {isMonthView && CalendarUtils.displayMonthAndYear(viewDate)}
            {!isMonthView && CalendarUtils.displayYearOnly(viewDate)}
          </Button>
          <ViewShiftButton
            className={classNames('view-shift-button', 'ripple')}
            icon={Icons.right}
            onClick={this.handleViewShift(NEXT)}
          />
        </ViewControls>
        <ViewContainer className={classNames('mei-calendar-view')}>
          {isMonthView &&
            viewHeaders.map((header) => (
              <div
                key={header}
                className={classNames(
                  'mei-calendar-view-option',
                  'day',
                  'header'
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
            const disableDate = isDummyDay || isOutOfRange;
            const title = isOutOfRange ? 'Out of range' : '';
            return (
              <ViewItem
                key={option.key}
                className={classNames('mei-calendar-view-option', {
                  day: isMonthView,
                  month: !isMonthView,
                  'dummy-day': isDummyDay
                })}
              >
                <Button
                  className={classNames({
                    selected: isViewOptionSelected(option)
                  })}
                  title={title}
                  onClick={() => this.handleViewOptionSelect(option)}
                  disabled={disableDate}
                >
                  {option.text}
                </Button>
              </ViewItem>
            );
          })}
        </ViewContainer>
      </StyledContainer>
    );
  }
}

export default Calendar;
