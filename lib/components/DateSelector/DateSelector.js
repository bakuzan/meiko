import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import Button from 'components/Button/Button';
import ClearableInput from 'components/ClearableInput/ClearableInput';
import Calendar from './Calendar/Calendar';
import { Enums, Strings, Icons } from 'constants/index';
import styles from './DateSelector.scss';

const cx = classNames.bind(styles);

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCalendar: false
    };

    this.openCalendar = this.openCalendar.bind(this);
    this.handleCloseCalendar = this.handleCloseCalendar.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    this.setState(
      { displayCalendar: false },
      () => this.props.onChange && this.props.onChange(date)
    );
  }

  handleDateChange(e) {
    console.log('%c date change not implemented', 'color: red', e.target.value);
  }

  render() {
    const { name, value, label, disabled, isFlat } = this.props;
    const renderStandardView = !isFlat;
    const isReadOnly = !this.props.onChange || disabled;

    return (
      <div
        id={`${name}-date-selector`}
        className={cx('date-selector-container', { 'read-only': isReadOnly })}
      >
        {renderStandardView && (
          <React.Fragment>
            <ClearableInput
              label={label}
              placeholder="__/__/____"
              id={`${name}-ctrl`}
              name={name}
              value={value}
              disabled={disabled}
              onChange={this.handleDateChange}
            />
            <Button
              className={cx('date-selector-button')}
              icon={Icons.calendar}
              btnSize="small"
              onClick={this.openCalendar}
              disabled={disabled}
            />
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
            className={cx({ flat: isFlat })}
            selected={value}
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
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  isFlat: PropTypes.bool
};

export default DateSelector;
