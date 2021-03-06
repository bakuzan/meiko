import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';
import AutocompleteInput from './AutocompleteInput';
import TagChip from './TagChip';
import { EventCodes } from './constants/enums';

import styles from './styles/ChipListInput';

class ChipListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.attr]: '',
      readyRemoval: false,
      isFocused: false
    };

    this.removeInputItem = this.removeInputItem.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(
      this
    );
    this.handleCreateNew = this.handleCreateNew.bind(this);
  }

  handleCreateNew() {
    if (!this.props.createNew) {
      return;
    }

    const { attr, createNew } = this.props;
    createNew({ [attr]: this.state[attr] }, this.props.name);
    this.setState({ [attr]: '' });
  }

  selectAutocompleteSuggestion(id) {
    const item = this.props.chipOptions.find((x) => x.id === id);
    if (!item) {
      return this.handleCreateNew();
    }

    const alreadyExists = this.props.chipsSelected.find(
      (x) => x.id === item.id
    );

    if (!alreadyExists) {
      this.updateList(item);
    }

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

  removeInputItem(data) {
    const { name } = data;
    const list = this.props.chipsSelected.filter(
      (x) => x[this.props.attr] !== name
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
    const { key } = event;

    if (key === EventCodes.Backspace && !this.state[this.props.attr]) {
      event.preventDefault();

      if (!this.state.readyRemoval) {
        this.setStateRemoval(true);
      } else {
        this.removeLastInputItem();
      }
    }
  }

  render() {
    const {
      chipOptions,
      chipsSelected,
      createNew,
      menuClassName,
      tagClassName,
      createNewMessage,
      updateChipList,
      ...props
    } = this.props;

    const chips = chipsSelected
      .filter((x) => x !== undefined)
      .map((item, index, array) => {
        const readyRemoval =
          this.state.readyRemoval && index === array.length - 1;
        return (
          <TagChip
            key={index}
            className={tagClassName}
            isActive={readyRemoval}
            data={{ name: item[props.attr] }}
            onRemove={this.removeInputItem}
          />
        );
      });

    const hasChips = chips.length > 0;
    const clearableInputClasses = {
      className: classNames(
        'chip-list-input__clearable-input',
        styles.clearButton
      )
    };

    return (
      <div
        className={classNames(
          'chip-list-input',
          this.state.isFocused && 'chip-list-input--focused',
          styles.chipListInput
        )}
      >
        {!!hasChips && (
          <div className={classNames('chip-list', styles.chipList)}>
            <div
              className={classNames('chip-list__inner', styles.chipList__inner)}
            >
              {chips}
            </div>
          </div>
        )}
        <AutocompleteInput
          {...props}
          items={chipOptions}
          filter={this.state[props.attr]}
          onChange={this.handleUserInput}
          onSelect={this.selectAutocompleteSuggestion}
          onKeyDown={this.handleKeyDown}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={() => this.setState({ isFocused: false })}
          noSuggestionsItem={
            !!createNew && (
              <Button
                className="chip-list-input__create-new"
                onClick={this.handleCreateNew}
              >
                {createNewMessage}
              </Button>
            )
          }
          menuClassName={menuClassName}
          clearableInputProps={clearableInputClasses}
        />
      </div>
    );
  }
}

ChipListInput.displayName = 'ChipListInput';
ChipListInput.defaultProps = {
  label: 'tags',
  createNewMessage: 'Create New Tag'
};

ChipListInput.propTypes = {
  label: PropTypes.string,
  attr: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  chipsSelected: PropTypes.arrayOf(PropTypes.object).isRequired,
  chipOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateChipList: PropTypes.func.isRequired,
  createNew: PropTypes.func,
  createNewMessage: PropTypes.string,
  menuClassName: PropTypes.string,
  tagClassName: PropTypes.string
};

export default ChipListInput;
