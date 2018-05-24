import classNames from 'classnames/bind';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/Button/Button';
import AutocompleteInput from 'components/AutocompleteInput/AutocompleteInput';
import Enums from 'constants/enums';
import Icons from 'constants/icons';
import styles from './ChipListInput.scss';

const cx = classNames.bind(styles);

class ChipListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.attr]: '',
      readyRemoval: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(
      this
    );
    this.handleCreateNew = this.handleCreateNew.bind(this);
  }

  handleCreateNew() {
    if (!this.props.createNew) return;
    const { attr, createNew } = this.props;
    createNew({ [attr]: this.state[attr] });
  }

  selectAutocompleteSuggestion(id) {
    const item = this.props.chipOptions.find(x => x._id === id);
    if (!item) return this.handleCreateNew();

    const alreadyExists = this.props.chipsSelected.find(
      x => x._id === item._id
    );
    if (alreadyExists) return;

    this.updateList(item);
    this.setState({ [this.props.attr]: '' });
  }

  persistListState(list) {
    this.props.updateChipList(this.props.name, list);
    this.setStateRemoval(false);
  }

  updateList(item) {
    const list = [...this.props.chipsSelected, item];
    this.persistListState(list);
  }

  removeInputItem(name) {
    const list = this.props.chipsSelected.filter(
      x => x[this.props.attr] !== name
    );
    this.persistListState(list);
  }

  removeLastInputItem() {
    const list = this.props.chipsSelected.slice(
      0,
      this.props.chipsSelected.length - 1
    );
    this.persistListState(list);
  }

  setStateRemoval(value) {
    this.setState({ readyRemoval: value });
  }

  handleUserInput(event) {
    const { value } = event.target;
    this.setState({
      [this.props.attr]: value.toLowerCase(),
      readyRemoval: false
    });
  }

  handleKeyDown(event) {
    const { keyCode } = event;
    if (keyCode === Enums.keyCodes.backspace && !this.state[this.props.attr]) {
      event.preventDefault();
      if (!this.state.readyRemoval) return this.setStateRemoval(true);
      if (this.state.readyRemoval) return this.removeLastInputItem();
    }
  }

  render() {
    const {
      label,
      attr,
      chipOptions,
      chipsSelected,
      createNew,
      menuClassName,
      tagClassName
    } = this.props;
    const chips = chipsSelected
      .filter(x => x !== undefined)
      .map((item, index, array) => {
        const readyRemoval =
          this.state.readyRemoval && index === array.length - 1;
        return (
          <span
            key={index}
            className={cx('input-chip', 'input-chip-deletable', tagClassName, {
              active: readyRemoval
            })}
          >
            <span className={cx('input-chip-text')}>{item[attr]}</span>
            <Button
              className={cx('input-chip-delete')}
              btnSize="small"
              title="remove"
              icon={Icons.cross}
              onClick={() => this.removeInputItem(item[attr])}
            />
          </span>
        );
      });
    const hasChips = chips.length > 0;
    const clearableInputClasses = {
      className: cx('chip-list-clearable-input')
    };

    return (
      <div className={cx('chip-list-input-container')}>
        <AutocompleteInput
          label={label}
          attr={attr}
          items={chipOptions}
          filter={this.state[attr]}
          onChange={this.handleUserInput}
          onSelect={this.selectAutocompleteSuggestion}
          onKeyDown={this.handleKeyDown}
          noSuggestionsItem={
            !!createNew && (
              <Button className="ripple" onClick={this.handleCreateNew}>
                Create New Tag
              </Button>
            )
          }
          menuClassName={menuClassName}
          clearableInputProps={clearableInputClasses}
        />
        {!!hasChips && (
          <div className={cx('chip-list-wrapper')}>
            <div className={cx('chip-list-inner')}>{chips}</div>
          </div>
        )}
      </div>
    );
  }
}

ChipListInput.defaultProps = {
  label: 'tags'
};

ChipListInput.propTypes = {
  label: PropTypes.string,
  attr: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  chipsSelected: PropTypes.arrayOf(PropTypes.object).isRequired,
  chipOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateChipList: PropTypes.func.isRequired,
  createNew: PropTypes.func,
  menuClassName: PropTypes.string,
  tagClassName: PropTypes.string
};

export default ChipListInput;
