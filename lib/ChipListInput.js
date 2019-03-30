import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';
import AutocompleteInput from './AutocompleteInput';
import TagChip from './TagChip';
import { KeyCodes } from './_constants/enums';
import './ChipListInput.scss';

const resolveId = (o) => o._id || o.id;

class ChipListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.attr]: '',
      readyRemoval: false
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
    const item = this.props.chipOptions.find((x) => resolveId(x) === id);
    if (!item) {
      return this.handleCreateNew();
    }

    const alreadyExists = this.props.chipsSelected.find(
      (x) => resolveId(x) === resolveId(item)
    );

    if (alreadyExists) {
      return;
    }

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
    const { keyCode } = event;
    if (keyCode === KeyCodes.backspace && !this.state[this.props.attr]) {
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
      className: classNames('chip-list-input__clearable-input')
    };

    return (
      <div className={classNames('chip-list-input')}>
        <AutocompleteInput
          {...props}
          items={chipOptions}
          filter={this.state[props.attr]}
          onChange={this.handleUserInput}
          onSelect={this.selectAutocompleteSuggestion}
          onKeyDown={this.handleKeyDown}
          noSuggestionsItem={
            !!createNew && (
              <Button className="ripple" onClick={this.handleCreateNew}>
                {createNewMessage}
              </Button>
            )
          }
          menuClassName={menuClassName}
          clearableInputProps={clearableInputClasses}
        />
        {!!hasChips && (
          <div className={classNames('chip-list')}>
            <div className={classNames('chip-list__inner')}>{chips}</div>
          </div>
        )}
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
