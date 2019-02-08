import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Button } from '../Button';
import AutocompleteInput from '../AutocompleteInput';
import TagChip from '../TagChip';
import { KeyCodes } from '../../constants/enums';

import styled from 'styles';

const resolveId = (o: IChipListItem) => o._id || o.id;

interface IChipListItem {
  id?: string | number;
  _id?: string | number;
  name?: string;
}
interface IChipListInputProps {
  label?: string;
  attr: string;
  name: string;
  chipsSelected: IChipListItem[];
  chipOptions: IChipListItem[];
  createNewMessage?: string;
  menuClassName?: string;
  tagClassName?: string;
  updateChipList(name: string, list: IChipListItem[]): void;
  createNew?(data: any, name: string): void;
}
interface IChipListInputState {
  readyRemoval?: boolean;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: 1em !important;

  .chip-list-clearable-input {
    padding: {
      left: 0;
      bottom: 0;
    }
  }

  .chip-list-wrapper {
    margin-bottom: 2px;
  }

  .chip-list-inner {
    display: inline-flex;
    flex-wrap: wrap;
    min-height: 36px;
    max-width: 400px;
    padding: 0 2px;
    border: 0;
    border-radius: 0;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

class ChipListInput extends React.Component<
  IChipListInputProps,
  IChipListInputState
> {
  static defaultProps = {
    label: 'tags',
    createNewMessage: 'Create New Tag'
  };

  static propTypes = {
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

  constructor(props: IChipListInputProps) {
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

  selectAutocompleteSuggestion(id: React.ReactText) {
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

  persistListState(list: IChipListItem[]) {
    this.props.updateChipList(this.props.name, list);
    this.setStateRemoval(false);
  }

  updateList(item: IChipListItem) {
    const list = [...this.props.chipsSelected, item];
    this.persistListState(list);
  }

  removeInputItem(data: IChipListItem) {
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

  setStateRemoval(value: boolean) {
    this.setState({ readyRemoval: value });
  }

  handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
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
      label,
      attr,
      chipOptions,
      chipsSelected,
      createNew,
      menuClassName,
      tagClassName,
      createNewMessage
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
            data={{ name: item[attr] }}
            onRemove={this.removeInputItem}
          />
        );
      });

    const hasChips = chips.length > 0;
    const clearableInputProps = {
      className: classNames('chip-list-clearable-input')
    };

    return (
      <StyledContainer className={classNames('chip-list-input-container')}>
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
                {createNewMessage}
              </Button>
            )
          }
          menuClassName={menuClassName}
          clearableInputProps={clearableInputProps}
        />
        {!!hasChips && (
          <div className={classNames('chip-list-wrapper')}>
            <div className={classNames('chip-list-inner')}>{chips}</div>
          </div>
        )}
      </StyledContainer>
    );
  }
}

export default ChipListInput;
