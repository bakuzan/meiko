import PropTypes from 'prop-types';
import className from 'classnames/bind';
import React from 'react';

import { Enums, Strings } from 'constants/index';
import Tickbox from 'components/Tickbox/Tickbox';
import Backdrop from 'components/Backdrop/Backdrop';
import styles from './MultiSelect.scss';

const cx = className.bind(styles);
const OPTION_PREFIX = 'option-';
const ALL_SELECTED_TEXT = 'All Selected';

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.handleToggleOpen = this.handleToggleOpen.bind(this);
    this.handleToggleClose = this.handleToggleClose.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleToggleOpen(e) {
    if (e.type !== Strings.events.click && !Enums.OPEN_KEYS.includes(e.keyCode))
      return;
    e.stopPropagation();
    this.setState({ isOpen: true });
  }

  handleToggleClose() {
    this.setState({ isOpen: false });
  }

  handleSelectAll() {
    const values = new Set([...this.props.values]);
    const options = new Set([...this.props.options.map(op => op.value)]);
    const hasAllSelected = values.size === options.size;
    const newValues = hasAllSelected ? [] : [...options.values()];
    this.props.onUpdate(newValues, this.props.name);
  }

  handleOptionChange(e) {
    const { name } = e.target;
    const index = Number(name.replace(OPTION_PREFIX, ''));
    const option = this.props.options.find((x, i) => i === index);
    const valuesSet = new Set([...this.props.values]);
    const hasValue = valuesSet.has(option.value);

    if (hasValue) {
      valuesSet.delete(option.value);
      this.props.onUpdate([...valuesSet.values()], this.props.name);
    } else {
      valuesSet.add(option.value);
      this.props.onUpdate([...valuesSet.values()], this.props.name);
    }
  }

  processValueForDisplay() {
    const { values, options } = this.props;
    const length = values.length;
    if (!length) return '';
    if (length === 1) return options.find(x => values.includes(x.value)).text;
    if (length === options.length) return ALL_SELECTED_TEXT;
    return `${length} selected`;
  }

  render() {
    const {
      id,
      name,
      className,
      listClassName,
      label,
      placeholder,
      values,
      options
    } = this.props;
    const multiSelectInput = id;
    const hasAllSelected = values.length === options.length;
    const displayValue = this.processValueForDisplay();

    return (
      <div className={cx('multi-select', className)}>
        <div className={cx('display', 'has-float-label', 'select-container')}>
          <input
            type="text"
            autoComplete="off"
            id={multiSelectInput}
            name={name}
            placeholder={placeholder}
            value={displayValue}
            tabIndex="0"
            readOnly
            onClick={this.handleToggleOpen}
            onKeyDown={this.handleToggleOpen}
          />
          <label htmlFor={multiSelectInput}>{label}</label>
        </div>
        <div
          className={cx('dropdown-container', { 'is-open': this.state.isOpen })}
        >
          <ul
            className={cx(
              'multi-select-list',
              'list column one',
              listClassName
            )}
          >
            <li key="ALL">
              <Tickbox
                name={`${id}--selectAll`}
                text="Select All"
                checked={hasAllSelected}
                onChange={this.handleSelectAll}
              />
            </li>
            <li
              key="SEPARATOR"
              className={cx('separator', 'meiko-multi-select-separator')}
            />
            {options.map((op, i) => (
              <li key={op.value}>
                <Tickbox
                  name={`${id}--${OPTION_PREFIX}${i}`}
                  text={op.text}
                  checked={values.includes(op.value)}
                  onChange={this.handleOptionChange}
                />
              </li>
            ))}
          </ul>
          <Backdrop onClickOrKey={this.handleToggleClose} />
        </div>
      </div>
    );
  }
}

MultiSelect.defaultProps = {
  label: 'MultiSelect',
  placeholder: 'None selected'
};

MultiSelect.propTypes = {
  listClassName: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string
    })
  ).isRequired,
  onUpdate: PropTypes.func
};

export default MultiSelect;
