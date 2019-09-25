import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { OPEN_KEYS, Strings } from './constants/index';
import Tickbox from './Tickbox';
import TabTrap from './TabTrap';

import styles from './styles/MultiSelect';
import sharedStyles from './styles/shared';
import addOutsideClick from './utils/addOutsideClick';

const EXTRACT_OPTION_INDEX = /^.*-/g;
const OPTION_PREFIX = 'option-';
const ALL_SELECTED_TEXT = 'All Selected';

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.removeOutsideListeners = null;
    this.menuRef = React.createRef();
    this.handleToggleOpen = this.handleToggleOpen.bind(this);
    this.handleToggleClose = this.handleToggleClose.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.isOpen && this.state.isOpen) {
      this.removeOutsideListeners = addOutsideClick(
        this.menuRef.current,
        this.handleToggleClose
      );
    }
  }

  componentWillUnmount() {
    this.removeOutsideListeners && this.removeOutsideListeners();
  }

  handleToggleOpen(e) {
    if (e.type !== Strings.events.click && !OPEN_KEYS.includes(e.key)) {
      return;
    }

    e.stopPropagation();
    this.setState({ isOpen: true });
  }

  handleToggleClose() {
    this.setState(
      { isOpen: false },
      () => this.removeOutsideListeners && this.removeOutsideListeners()
    );
  }

  handleSelectAll() {
    const values = new Set([...this.props.values]);
    const options = new Set([...this.props.options.map((op) => op.value)]);
    const hasAllSelected = values.size === options.size;
    const newValues = hasAllSelected ? [] : [...options.values()];
    this.props.onUpdate(newValues, this.props.name);
  }

  handleOptionChange(e) {
    const { name } = e.target;
    const index = Number(name.replace(EXTRACT_OPTION_INDEX, ''));
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
    if (!length) {
      return '';
    } else if (length === 1) {
      return options.find((x) => values.includes(x.value)).text;
    } else if (length === options.length) {
      return ALL_SELECTED_TEXT;
    } else {
      return `${length} selected`;
    }
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
      <div
        className={classNames('multi-select', styles.multiSelect, className)}
      >
        <div
          className={classNames(
            'multi-select__display',
            'has-float-label',
            'select-container',
            styles.multiSelect__display,
            sharedStyles.controlContainer
          )}
        >
          <input
            type="text"
            autoComplete="off"
            id={multiSelectInput}
            className="multi-select__input"
            name={name}
            placeholder={placeholder}
            value={displayValue}
            tabIndex={0}
            readOnly
            onClick={this.handleToggleOpen}
            onKeyDown={this.handleToggleOpen}
          />
          <label htmlFor={multiSelectInput}>{label}</label>
        </div>
        <div
          aria-hidden={!this.state.isOpen}
          className={classNames(
            'multi-select__dropdown-container',
            { 'multi-select__dropdown-container--is-open': this.state.isOpen },
            styles.multiSelect__dropdown,
            this.state.isOpen && styles.multiSelect__dropdown_open,
            listClassName
          )}
        >
          <TabTrap
            ref={this.menuRef}
            element="ul"
            isActive={this.state.isOpen}
            className={classNames(
              'multi-select__list',
              styles.multiSelect__list
            )}
            firstId={`${id}--selectAll`}
            lastId={`${id}--${OPTION_PREFIX}${options.length - 1}`}
            onDeactivate={() => {
              const input = document.getElementById(multiSelectInput);
              if (input) {
                input.focus();
              }
            }}
          >
            <li key="ALL">
              <Tickbox
                id={`${id}--selectAll`}
                name={`${id}--selectAll`}
                text="Select All"
                checked={hasAllSelected}
                onChange={this.handleSelectAll}
              />
            </li>
            <li
              key="SEPARATOR"
              className={classNames(
                'multi-select__separator',
                styles.separator
              )}
            />
            {options.map((op, i) => {
              const idAndName = `${id}--${OPTION_PREFIX}${i}`;
              return (
                <li key={op.value}>
                  <Tickbox
                    id={idAndName}
                    name={idAndName}
                    text={op.text}
                    checked={values.includes(op.value)}
                    onChange={this.handleOptionChange}
                  />
                </li>
              );
            })}
          </TabTrap>
        </div>
      </div>
    );
  }
}

MultiSelect.displayName = 'MultiSelect';
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
