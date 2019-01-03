import classNames from 'classnames';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import ClearableInput from '../ClearableInput';
import AutocompleteSuggestionItem, {
  IAutocompleteSuggestionProps
} from './AutocompleteInputSuggestionItem';

import { KeyCodes } from '../../constants/enums';
import { isNumber, getTimeoutSeconds } from '../../utils';
import { IAutocompleteOption } from 'types';
import './AutocompleteInput.scss';

interface IAutocompleteInputProps {
  label?: string;
  attr: string;
  items: IAutocompleteOption[];
  filter: string;
  disableLocalFilter: boolean;
  menuClassName?: string;
  clearableInputProps?: {
    className?: string;
    clearInputButtonClass?: string;
  };
  noSuggestionsItem?: JSX.Element;
  onChange(e: Event): void;
  onSelect(id: string | number): void;
  onKeyDown?(e: Event): void;
  suggestionTemplate?(props: IAutocompleteSuggestionProps): JSX.Element;
}
interface IAutocompleteInputState {
  inUse: boolean;
  activeSuggestion: number;
}

class AutocompleteInput extends React.Component<
  IAutocompleteInputProps,
  IAutocompleteInputState
> {
  static defaultProps = {
    disableLocalFilter: false,
    noSuggestionsItem: null,
    suggestionTemplate: AutocompleteSuggestionItem,
    clearableInputProps: {}
  };

  static propTypes = {
    label: PropTypes.string,
    attr: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    disableLocalFilter: PropTypes.bool,
    suggestionTemplate: PropTypes.func,
    menuClassName: PropTypes.string,
    clearableInputProps: PropTypes.shape({
      className: PropTypes.string,
      clearInputButtonClass: PropTypes.string
    }),
    noSuggestionsItem: PropTypes.bool
  };

  private timer = null;

  constructor(props: IAutocompleteInputProps) {
    super(props);
    this.state = {
      inUse: false,
      activeSuggestion: 0
    };

    this.timer = null;
    this.selectAutocompleteSuggestion = this.selectAutocompleteSuggestion.bind(
      this
    );
    this.highlightMatch = this.highlightMatch.bind(this);
    this.handleInputFilter = this.handleInputFilter.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  selectAutocompleteSuggestion(id) {
    if (!id && id !== 0 && !this.props.noSuggestionsItem) {
      return;
    }

    this.props.onSelect(id);
  }

  selectActiveSuggestion() {
    const item = this.filterAutoComplete()[this.state.activeSuggestion];
    const id = !!item ? (isNumber(item.id) ? item.id : item._id) : null;
    this.selectAutocompleteSuggestion(id);
  }

  filterAutoComplete() {
    const { items, attr, filter, disableLocalFilter } = this.props;
    if (!(items && filter)) {
      return [];
    }

    if (disableLocalFilter) {
      return items;
    }

    const filterLowerCase = filter.toLowerCase();
    return items.filter(
      (x) => x[attr].toLowerCase().indexOf(filterLowerCase) > -1
    );
  }

  updateActiveSuggestion(value) {
    const maxIndex = this.filterAutoComplete().length - 1;
    let newValue = this.state.activeSuggestion + value;
    if (newValue > maxIndex) {
      newValue = 0;
    }
    if (newValue < 0) {
      newValue = maxIndex;
    }
    this.setState({ activeSuggestion: newValue });
  }

  highlightMatch(value) {
    const match = value.match(new RegExp(this.props.filter, 'i'));
    if (!match) {
      return value;
    }

    const length = this.props.filter.length;
    return (
      <span className={classNames('autocomplete-suggestion-text')}>
        {value.slice(0, match.index)}
        <span className={classNames('highlight')}>
          {value.slice(match.index, match.index + length)}
        </span>
        {value.slice(match.index + length)}
      </span>
    );
  }

  handleInputFilter(event) {
    this.props.onChange(event);
    this.setState({ activeSuggestion: 0 });
  }

  handleKeyDown(event) {
    const { keyCode } = event;
    if (keyCode === KeyCodes.enter && this.props.filter) {
      event.preventDefault();
      this.selectActiveSuggestion();
    } else if (keyCode === KeyCodes.down) {
      this.updateActiveSuggestion(1);
    } else if (keyCode === KeyCodes.up) {
      this.updateActiveSuggestion(-1);
    } else if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  handleFocus(e) {
    clearTimeout(this.timer);
    this.setState({ inUse: true });
  }

  handleBlur(e) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.timer) {
        return;
      }

      this.setState({ inUse: false });
    }, getTimeoutSeconds(1));
  }

  render() {
    const {
      filter,
      attr,
      label,
      noSuggestionsItem,
      disableLocalFilter,
      suggestionTemplate: AutocompleteSuggestionTemplate,
      menuClassName,
      clearableInputProps
    } = this.props;
    const autocomplete = this.filterAutoComplete();
    const hasOptions = !!this.props.items.length;
    const hasSuggestions = !!autocomplete.length;

    return (
      <div className={classNames('autocomplete')}>
        <ClearableInput
          label={label}
          name={attr}
          value={filter}
          onChange={this.handleInputFilter}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...clearableInputProps}
        />
        {!!filter && this.state.inUse && (
          <ul
            className={classNames(
              menuClassName,
              'autocomplete-menu',
              'list column one'
            )}
          >
            {hasSuggestions &&
              autocomplete.map((item, index) => (
                <AutocompleteSuggestionTemplate
                  key={item.id || item._id}
                  activeSuggestion={this.state.activeSuggestion}
                  index={index}
                  attr={attr}
                  item={item}
                  selectAutocompleteSuggestion={
                    this.selectAutocompleteSuggestion
                  }
                  highlightMatch={this.highlightMatch}
                />
              ))}
            {!hasSuggestions && (hasOptions || disableLocalFilter) && (
              <li
                key="NONE"
                className={classNames(
                  'autocomplete-suggestion',
                  'no-suggestions-item',
                  'active'
                )}
              >
                {!!noSuggestionsItem ? (
                  noSuggestionsItem
                ) : (
                  <div>No suggestions available</div>
                )}
              </li>
            )}
          </ul>
        )}
      </div>
    );
  }
}

export default AutocompleteInput;
