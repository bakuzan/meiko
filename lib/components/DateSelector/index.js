import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import { Button } from 'components/Button';
import ClearableInput from 'components/ClearableInput';
import Calendar from './Calendar/Calendar';
import { checkDatesAgainstRange } from './Calendar/CalendarUtils';
import { Enums, Strings, Icons } from 'constants/index';
import styles from './DateSelector.scss';

const cx = classNames.bind(styles);

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

    this.openCalendar = this.openCalendar.bind(this);
    this.handleCloseCalendar = this.handleCloseCalendar.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  setErrorState(errorMessage) {
    this.setState({ errorMessage });
  }

  openCalendar() {
    this.setState({ displayCalendar: true });
  }

  handleCloseCalendar(e) {
    if (
      e.type !== Strings.events.click &&
      !Enums.CLOSE_KEYS.includes(e.keyCode)
    )
      return;
    this.setState({ displayCalendar: false });
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
      : !date && required ? ErrorMessages.isRequired : null;

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
        id={`${name}-date-selector`}
        className={cx(
          'date-selector-container',
          { 'read-only': isReadOnly },
          className
        )}
      >
        {renderStandardView && (
          <React.Fragment>
            <ClearableInput
              type="date"
              label={label}
              placeholder="__/__/____"
              id={`${name}-ctrl`}
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
                className={cx('date-selector-button', 'clear')}
                icon={Icons.cross}
                btnSize="small"
                onClick={() => this.handleDateChange(CLEAR_EVENT)}
                disabled={disabled}
              />
            )}
            <Button
              className={cx('date-selector-button')}
              icon={Icons.calendar}
              btnSize="small"
              onClick={this.openCalendar}
              disabled={disabled}
            />
            {this.state.errorMessage && (
              <div className={cx('error-message')}>
                {this.state.errorMessage}
              </div>
            )}
          </React.Fragment>
        )}
        {!isFlat &&
          this.state.displayCalendar && (
            <div
              className={cx('date-selector-calendar-backdrop')}
              role="button"
              tabIndex="0"
              onClick={this.handleCloseCalendar}
              onKeyDown={this.handleCloseCalendar}
            />
          )}
        {(isFlat || this.state.displayCalendar) && (
          <Calendar
            id={name}
            className={cx({ flat: isFlat }, calendarClassName)}
            selected={value}
            afterDate={afterDate}
            beforeDate={beforeDate}
            disabled={disabled}
            onSelect={this.handleDateSelect}
          />
        )}
      </div>
    );
  }
}

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
