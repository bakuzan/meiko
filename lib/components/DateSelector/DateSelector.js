import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';

import Button from 'components/Button/Button';
import ClearableInput from 'components/ClearableInput/ClearableInput';
import Calendar from './Calendar';
import Icons from 'constants/icons';
import styles from './DateSelector.scss';

const cx = classNames.bind(styles);

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCalendar: false
    };

    this.openCalendar = this.openCalendar.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  openCalendar() {
    this.setState({ displayCalendar: true });
  }

  handleDateSelect(date) {
    this.setState(
      { displayCalendar: false },
      () => this.props.onChange && this.props.onChange(date)
    );
  }

  handleDateChange(e) {
    console.log('date change', e.target.value);
  }

  render() {
    const { name, value, label, isFlat } = this.props;
    const renderStandardView = !isFlat;
    const isReadOnly = !this.props.onChange;

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
              onChange={this.handleDateChange}
            />
            <Button
              className={cx('date-selector-button')}
              icon={Icons.calendar}
              btnSize="small"
              onClick={this.openCalendar}
            />
          </React.Fragment>
        )}
        {(isFlat || this.state.displayCalendar) && (
          <Calendar
            id={name}
            className={cx({ flat: isFlat })}
            selected={value}
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
  onChange: PropTypes.func,
  isFlat: PropTypes.bool
};

export default DateSelector;
