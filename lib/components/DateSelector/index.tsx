import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import ClearableInput from '../ClearableInput';
import Calendar from './Calendar/Calendar';
import { checkDatesAgainstRange } from './Calendar/CalendarUtils';
import Icons from '../../constants/icons';

import Backdrop from 'components/Backdrop';
import { ErrorMessage, Container, SelectorButton } from './styles';

const CLEAR_EVENT = { target: { value: '' } };
const ErrorMessages = {
  dateIsOutOfRange: 'Date is out of range',
  isRequired: 'Date is required'
};

interface IDateSelectorProps {
  className?: string;
  calendarClassName?: string;
  name: string;
  value: string;
  label: string;
  required: boolean;
  disabled: boolean;
  afterDate: string;
  beforeDate: string;
  isFlat: boolean;
  onChange(date: string, name: string, hasError: boolean): void;
}
interface IDateSelectorState {
  displayCalendar: boolean;
  errorMessage: string;
}

class DateSelector extends React.Component<
  IDateSelectorProps,
  IDateSelectorState
> {
  static defaultProps = {
    label: 'Date'
  };

  static propTypes = {
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

  constructor(props: IDateSelectorProps) {
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

  setErrorState(errorMessage: string) {
    this.setState({ errorMessage });
  }

  openCalendar() {
    this.setState({ displayCalendar: true });
  }

  handleCloseCalendar() {
    this.setState({ displayCalendar: false });
  }

  handleDateSelect(date: string) {
    this.setState({ displayCalendar: false }, () => this.passOutNewValue(date));
  }

  handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const date = e.target.value;
    this.passOutNewValue(date);
  }

  passOutNewValue(date: string) {
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
      <Container
        id={`${name}-date-selector`}
        className={classNames(
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
              <SelectorButton
                className={classNames('date-selector-button', 'clear')}
                icon={Icons.cross}
                btnSize="small"
                onClick={() =>
                  this.handleDateChange(CLEAR_EVENT as React.ChangeEvent<
                    HTMLInputElement
                  >)
                }
                disabled={disabled}
              />
            )}
            <SelectorButton
              className={classNames('date-selector-button')}
              icon={Icons.calendar}
              btnSize="small"
              onClick={this.openCalendar}
              disabled={disabled}
            />
            {this.state.errorMessage && (
              <ErrorMessage className={classNames('error-message')}>
                {this.state.errorMessage}
              </ErrorMessage>
            )}
          </React.Fragment>
        )}
        {!isFlat && this.state.displayCalendar && (
          <Backdrop onClickOrKey={this.handleCloseCalendar} />
        )}
        {(isFlat || this.state.displayCalendar) && (
          <Calendar
            id={name}
            className={classNames({ flat: isFlat }, calendarClassName)}
            selected={value}
            afterDate={afterDate}
            beforeDate={beforeDate}
            disabled={disabled}
            onSelect={this.handleDateSelect}
          />
        )}
      </Container>
    );
  }
}

export default DateSelector;
