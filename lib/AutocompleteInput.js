import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import ClearableInput from './ClearableInput';
import AutocompleteSuggestionItem from './AutocompleteInputSuggestionItem';

import { EventCodes } from './constants/enums';
import { getTimeoutSeconds } from './utils';

import styles from './styles/AutocompleteInput';

class AutocompleteInput extends React.Component {
  constructor(props) {
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
    const id = !!item ? item.id : null;
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
      <span
        className={classNames(
          'autocomplete-suggestion__text',
          styles.suggestion__text
        )}
      >
        {value.slice(0, match.index)}
        <span
          className={classNames(
            'autocomplete-suggestion-highlight',
            styles.suggestionHighlight
          )}
        >
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
    const { key } = event;
    if (key === EventCodes.Enter && this.props.filter) {
      event.preventDefault();
      this.selectActiveSuggestion();
    } else if (key === EventCodes.ArrowDown) {
      this.updateActiveSuggestion(1);
    } else if (key === EventCodes.ArrowUp) {
      this.updateActiveSuggestion(-1);
    } else if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  handleFocus(e) {
    clearTimeout(this.timer);
    this.setState(
      { inUse: true },
      () => this.props.onFocus && this.props.onFocus(e)
    );
  }

  handleBlur(e) {
    this.props.onBlur && this.props.onBlur(e);

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (!this.timer) {
        return;
      }

      this.setState({ inUse: false });
    }, getTimeoutSeconds(0.5));
  }

  render() {
    const {
      filter,
      attr,
      noSuggestionsItem,
      disableLocalFilter,
      suggestionTemplate: AutocompleteSuggestionTemplate,
      menuClassName,
      clearableInputProps,
      items,
      onChange,
      onSelect,
      onKeyDown,
      suggestionTemplate,
      ...props
    } = this.props;
    const autocomplete = this.filterAutoComplete();
    const hasOptions = !!this.props.items.length;
    const hasSuggestions = !!autocomplete.length;

    return (
      <div className={classNames('autocomplete', styles.autocomplete)}>
        <ClearableInput
          {...props}
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
              'autocomplete__menu',
              styles.autocomplete__menu,
              menuClassName
            )}
          >
            {hasSuggestions &&
              autocomplete.map((item, index) => (
                <AutocompleteSuggestionTemplate
                  key={item.id}
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
                  'autocomplete-suggestion--no-items',
                  'autocomplete-suggestion--active',
                  styles.suggestion,
                  styles.suggestion_noItems
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

AutocompleteInput.displayName = 'AutocompleteInput';
AutocompleteInput.defaultProps = {
  disableLocalFilter: false,
  noSuggestionsItem: null,
  suggestionTemplate: AutocompleteSuggestionItem,
  clearableInputProps: {}
};

AutocompleteInput.propTypes = {
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
    id: PropTypes.string,
    className: PropTypes.string,
    clearInputButtonClass: PropTypes.string
  }),
  noSuggestionsItem: PropTypes.oneOfType([PropTypes.node, PropTypes.element])
};

export default AutocompleteInput;
