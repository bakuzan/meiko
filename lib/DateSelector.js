import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from './Button';
import ClearableInput from './ClearableInput';
import Calendar from './DateSelectorCalendar';
import { checkDatesAgainstRange } from './utils/calendar';
import { Icons } from './constants/index';

import styles from './styles/DateSelector';
import addOutsideClick from './utils/addOutsideClick';

const CLEAR_EVENT = { target: { value: '' } };
const ErrorMessages = {
  dateIsOutOfRange: 'Date is out of range',
  isRequired: 'Date is required'
};

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCalendar: false,
      errorMessage: null
    };

    this.removeOutsideListeners = null;
    this.calendarContainer = React.createRef();
    this.openCalendar = this.openCalendar.bind(this);
    this.handleCloseCalendar = this.handleCloseCalendar.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidUpdate(_, prevState) {
    const calendarNowOpen =
      !prevState.displayCalendar && this.state.displayCalendar;

    if (!this.props.isFlat && calendarNowOpen) {
      this.removeOutsideListeners = addOutsideClick(
        this.calendarContainer.current,
        this.handleCloseCalendar
      );
    }
  }

  componentWillUnmount() {
    this.removeOutsideListeners && this.removeOutsideListeners();
  }

  setErrorState(errorMessage) {
    this.setState({ errorMessage });
  }

  openCalendar() {
    this.setState({ displayCalendar: true });
  }

  handleCloseCalendar() {
    this.setState(
      { displayCalendar: false },
      () => this.removeOutsideListeners && this.removeOutsideListeners()
    );
  }

  handleDateSelect(date) {
    this.setState({ displayCalendar: false }, () => this.passOutNewValue(date));
  }

  handleDateChange(e) {
    const date = e.target.value;
    this.passOutNewValue(date);
  }

  passOutNewValue(date) {
    const { afterDate, beforeDate, required } = this.props;
    const dateIsOutOfRange = checkDatesAgainstRange(
      { afterDate, beforeDate },
      date
    );

    const error = dateIsOutOfRange
      ? ErrorMessages.dateIsOutOfRange
      : !date && required
      ? ErrorMessages.isRequired
      : null;

    this.setErrorState(error);
    if (this.props.onChange) {
      const hasError = !!error;
      this.props.onChange(date, this.props.name, hasError);
    }
  }

  render() {
    const {
      className,
      calendarClassName,
      id,
      name,
      value,
      label,
      required,
      disabled,
      isFlat,
      afterDate,
      beforeDate
    } = this.props;
    const renderStandardView = !isFlat;
    const isReadOnly = !this.props.onChange || disabled;
    const displayClearButton = !required && !isReadOnly && !!value;

    return (
      <div
        id={`${id}-date-selector`}
        className={classNames(
          'date-selector',
          { 'date-selector--read-only': isReadOnly },
          styles.dateSelector,
          className
        )}
      >
        {renderStandardView && (
          <React.Fragment>
            <ClearableInput
              type="date"
              label={label}
              placeholder="__/__/____"
              id={`${id}-ctrl`}
              className={styles.dateSelector__input}
              name={name}
              value={value}
              required={required}
              disabled={disabled}
              min={afterDate}
              max={beforeDate}
              pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
              onChange={this.handleDateChange}
            />
            {displayClearButton && (
              <Button
                className={classNames(
                  'date-selector__button',
                  'date-selector__clear'
                )}
                aria-label="Clear date"
                icon={Icons.cross}
                btnSize="small"
                onClick={() => this.handleDateChange(CLEAR_EVENT)}
                disabled={disabled}
              />
            )}
            <Button
              className={classNames('date-selector__button')}
              aria-label="Open calendar"
              icon={Icons.calendar}
              btnSize="small"
              onClick={this.openCalendar}
              disabled={disabled}
            />
            {this.state.errorMessage && (
              <div
                className={classNames(
                  'date-selector__error-message',
                  styles.error
                )}
              >
                {this.state.errorMessage}
              </div>
            )}
          </React.Fragment>
        )}
        <div ref={this.calendarContainer}>
          {(isFlat || this.state.displayCalendar) && (
            <Calendar
              id={id}
              className={classNames(calendarClassName)}
              isFlat={isFlat}
              selected={value}
              afterDate={afterDate}
              beforeDate={beforeDate}
              disabled={disabled}
              onSelect={this.handleDateSelect}
            />
          )}
        </div>
      </div>
    );
  }
}

DateSelector.displayName = 'DateSelector';
DateSelector.defaultProps = {
  label: 'Date'
};

DateSelector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  afterDate: PropTypes.string,
  beforeDate: PropTypes.string,
  onChange: PropTypes.func,
  isFlat: PropTypes.bool
};

export default DateSelector;