import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import * as React from 'react';

import { Enums, Strings } from '../../constants/index';
import Tickbox from '../Tickbox';
import Backdrop from '../Backdrop';
import { ISelectBoxOption } from 'types';
import './MultiSelect.scss';

const EXTRACT_OPTION_INDEX = /^.*-/g;
const OPTION_PREFIX = 'option-';
const ALL_SELECTED_TEXT = 'All Selected';

interface IMultiSelectProps {
  className?: string;
  listClassName?: string;
  name: string;
  id: string;
  placeholder: string;
  label: string;
  values: Array<string | number>;
  options: ISelectBoxOption[];
  onUpdate(values: Array<string | number>, name: string): void;
}
interface IMultiSelectState {
  isOpen: boolean;
}

class MultiSelect extends React.Component<
  IMultiSelectProps,
  IMultiSelectState
> {
  static defaultProps = {
    label: 'MultiSelect',
    placeholder: 'None selected'
  };

  static propTypes = {
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

  constructor(props: IMultiSelectProps) {
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
    if (
      e.type !== Strings.events.click &&
      !Enums.OPEN_KEYS.includes(e.keyCode)
    ) {
      return;
    }

    e.stopPropagation();
    this.setState({ isOpen: true });
  }

  handleToggleClose() {
    this.setState({ isOpen: false });
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
      <div className={classNames('multi-select', className)}>
        <div
          className={classNames(
            'display',
            'has-float-label',
            'select-container'
          )}
        >
          <input
            type="text"
            autoComplete="off"
            id={multiSelectInput}
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
          className={classNames(
            'dropdown-container',
            { 'is-open': this.state.isOpen },
            listClassName
          )}
        >
          <ul className={classNames('multi-select-list', 'list column one')}>
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
                'separator',
                'meiko-multi-select-separator'
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
          </ul>
        </div>
        {this.state.isOpen && (
          <Backdrop onClickOrKey={this.handleToggleClose} />
        )}
      </div>
    );
  }
}

export default MultiSelect;
